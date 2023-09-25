import db from "../db";
import bcrypt from "bcrypt";
import { sqlForPartialUpdate } from "../helpers/sql";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from "../expressError";
import { BCRYPT_WORK_FACTOR } from "../config";
import { v4 as uuidv4 } from "uuid";

interface UserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  bio: string;
  videos: string[];
  photos: string[];
  favMountains: string[];
  isAdmin: boolean;
}

interface UserUpdateData {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  bio: string;
  videos: string[];
  photos: string[];
  favMountains: string[];
}

interface UserDataRow {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  bio: string;
  videos: string[];
  photos: string[];
  favMountains: string[];
  isAdmin: boolean;
}

class User {
  static async authenticate(
    username: string,
    password: string
  ): Promise<UserData> {
    const result = await db.query(
      `SELECT id,
                    username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email
            FROM users
            WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isItValid: boolean = await bcrypt.compare(password, user.password);
      if (isItValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static async register(
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
      throw new BadRequestError(`Duplicate username: ${username}`);
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
      [id, username, hashedPassword, firstName, lastName, email]
    );

    const user = result.rows[0];

    return user;
  }

  static async findAllUsers(): Promise<UserData[]> {
    const result = await db.query(
      `SELECT id,
                    username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    avatar,
                    bio,
                    is_admin AS "isAdmin"
                FROM users
                ORDER BY username`
    );

    return result.rows;
  }

  static async getUser(username: string): Promise<UserData> {
    const result = await db.query(
      `SELECT u.id,
                    u.username,
                    u.first_name AS "firstName",
                    u.last_name AS "lastName",
                    u.email,
                    u.avatar,
                    u.bio,
                    u.is_admin AS "isAdmin",
                    v.link AS "videos",
                    p.link AS "photos",
                    s.slug AS "favMountains" 
                FROM users u
                LEFT JOIN users_videos uv ON u.id = uv.user_id
                LEFT JOIN videos v ON uv.video_id = v.id
                LEFT JOIN users_photos up ON u.id = up.user_id
                LEFT JOIN photos p ON up.photo_id = p.id
                LEFT JOIN fav_mountains fm ON u.id = fm.user_id
                LEFT JOIN ski_areas s ON fm.ski_area_slug = s.slug
                WHERE username = $1`,
      [username]
    );

    const rows = result.rows;

    if (rows.length === 0) throw new NotFoundError("User not found.");

    const user: UserData = {
      id: rows[0].id,
      username: rows[0].username,
      firstName: rows[0].firstName,
      lastName: rows[0].lastName,
      email: rows[0].email,
      avatar: rows[0].avatar,
      bio: rows[0].bio,
      videos: rows.map((row) => row.videos).filter((link) => link !== null),
      photos: rows.map((row) => row.photos).filter((link) => link !== null),
      favMountains: rows
        .map((row) => row.favMountains)
        .filter((slug) => slug !== null),
      isAdmin: rows[0].isAdmin,
    };

    console.log(rows[0]);

    return user;
  }

  static async updateUser(
    username: string,
    data: Partial<UserUpdateData>
  ): Promise<UserUpdateData> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      isAdmin: "is_admin",
    });

    const usernameVarIdx = "$" + (values.length + 1);

    const sqlQuery = `UPDATE users
                                SET ${setCols}
                                WHERE username = ${usernameVarIdx}
                                RETURNING username,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    avatar,
                                    bio`;
    const result = await db.query(sqlQuery, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User not found: ${username}`);

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

    if (!user) throw new NotFoundError(`User not found: ${username}`);
  }
}

export default User;
