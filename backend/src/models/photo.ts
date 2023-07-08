import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface PhotoData {
    id: string;
    userId: string;
    link: string;
    about: string;
    tagId: string;
}

class Photo {
    static async createPhoto(userId: string, link: string, about: string, tagId: string): Promise<PhotoData> {
        const id = uuidv4();

        const result = await db.query( `
            INSERT INTO photos
                (   id,
                    user_id,
                    link,
                    about,
                    tag_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING 
                    id,
                    user_id AS "userId",
                    link,
                    about,
                    tag_id AS "tagId"`,
            [id, userId, link, about, tagId]
        );

        const photo = result.rows[0];

        return photo;
    };

    static async updatePhoto(id: string, data: Partial<PhotoData>): Promise<PhotoData> {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                userId: "user_id",
                tagId: "tag_id"
            }
        );

        const sqlQuery = `UPDATE photos
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING id,
                                user_id AS "userId",
                                link,
                                about,
                                tag_id AS "tagId"`;
        const result = await db.query(sqlQuery, [...values, id]);
        const photo = result.rows[0];

        if(!photo) throw new NotFoundError('Photo not found!');

        return photo;
    }

    static async removePhoto(id: string): Promise<void> {
        const result = await db.query(`
            DELETE FROM photos
                WHERE id = $1
                RETURNING id`,
                [id]);

        const photo = result.rows[0];

        if(!photo) throw new NotFoundError('Photo not found!');
    }
}