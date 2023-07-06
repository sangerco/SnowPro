import db from '../db';
import bcrypt from 'bcrypt';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../expressError';
import { BCRYPT_WORK_FACTOR } from '../config';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    bio: string,
    videoLinks: string
}

class User {
    static async authenticate (username: string, password: string): Promise<UserData | undefined> {
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email
            FROM users
            WHERE username is $1`,
        [username],
        );

        const user = result.rows[0];

        if(user) {
            const isItValid: boolean = await bcrypt.compare(password, user.password);
            if (isItValid === true) {
                delete user.password;
                return user;
            }
        }
    
        throw new UnauthorizedError('Invalid username/password')

    };

    static async register (
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        email: string
        ): Promise<UserData> {
            const dupeCheck = await db.query(
                `SELECT username
                FROM users
                WHERE username = $1`,
                [username]
            );

            if (dupeCheck.rows[0]) {
                throw new BadRequestError(`Duplicate username: ${username}`)
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
            const id = uuidv4();

            const result = await db.query(
                `INSERT INTO users
                (   id,
                    username,
                    password,
                    first_name,
                    last_name,
                    email)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
                [   id,
                    username,
                    hashedPassword,
                    firstName,
                    lastName,
                    email
                ]
            );

            const user = result.rows[0];

            return user;
        }

        static async findAllUsers(): Promise<UserData[]> {
            const result = await db.query(
                `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    avatar,
                    bio,
                    video_links AS "videoLinks"
                FROM users
                ORDER BY username`
            );

            return result.rows;
        }

        static async getUser(username: string): Promise<UserData> {
            const result = await db.query(
                `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    avatar,
                    bio,
                    video_links AS "videoLinks"
                FROM users
                WHERE username = $1`,
                [username]
            );

            const user = result.rows[0];

            if (!user) throw new NotFoundError('User not found.')

            return user;
        }

        static async updateUser(username: string, data: Partial<UserData>): Promise<UserData> {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)
            }

            const { setCols, values } = sqlForPartialUpdate(
                data, 
                {
                    firstName: 'first_name',
                    lastName: 'last_name'
                }
            );

            const usernameVarIdx = "$" + (values.length + 1);

            const sqlQuery = `UPDATE users
                                SET ${setCols}
                                WHERE username = ${usernameVarIdx}
                                RETURNING username,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    avatar,
                                    bio,
                                    video_links AS "videoLinks"`;
            const result = await db.query(sqlQuery, [...values, username]);
            const user = result.rows[0];

            if(!user) throw new NotFoundError(`User not found: ${username}`);

            delete user.password;
            return user;
        }

        static async remove(username: string): Promise<void> {
            const result = await db.query(
                `DELETE FROM users
                    WHERE username = $1
                    RETURNING username`,
                    [username]
            );
            const user = result.rows[0];

            if (!user) throw new NotFoundError(`User not found: ${username}`)
        }
}

export default User;