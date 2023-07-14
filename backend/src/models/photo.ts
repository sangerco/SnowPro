import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface PhotoData {
    id: string;
    userId: string;
    link: string;
    about: string;
    tagIds: string[];
}

class Photo {
    static async createPhoto(userId: string, link: string, about: string, tagIds: string[]): Promise<PhotoData> {
        const id = uuidv4();

        const result = await db.query( `
            INSERT INTO photos
                (   id,
                    user_id,
                    link,
                    about)
            VALUES ($1, $2, $3, $4)
            RETURNING 
                    id,
                    user_id AS "userId",
                    link,
                    about`,
            [id, userId, link, about]
        );

        const photo = result.rows[0];

        for (let tagId of tagIds) {
            await db.query(`
                INSERT INTO review_tags (review_id, tag_id)
                VALUES ($1, $2)`,
            [photo.id, tagId])

            photo.tagIds.push(tagId);
        }

        return photo;
    };

    static async getPhoto(id:string): Promise<PhotoData> {
        const result = await db.query(
            `SELECT p.id,
                p.user_id AS "userId",
                p.link,
                p.about,
                p.tag_id AS "tagId",
                t.tag
                FROM photos p
                LEFT JOIN photos_tags pt ON p.tag_id = pt.tag_id
                LEFT JOIN tags t ON pt.tag_id = t.id
                WHERE p.id = $1`,
            [id]
        )

        const photo = result.rows[0];

        if(!photo) throw new NotFoundError('Photo Not Found');

        return photo;
    };

    static async updatePhoto(id: string, data: Partial<PhotoData>): Promise<PhotoData> {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                userId: "user_id"
            }
        );

        const sqlQuery = `UPDATE photos
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING id,
                                user_id AS "userId",
                                link,
                                about`;
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
};

export default Photo;