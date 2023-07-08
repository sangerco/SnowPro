import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface VideoData {
    id: string;
    userId: string;
    link: string;
    about: string;
    tagId: string;
}

class Video {
    static async createVideo(userId: string, link: string, about: string, tagId: string): Promise<VideoData> {
        const id = uuidv4();

        const result = await db.query( `
            INSERT INTO videos
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

        const video = result.rows[0];

        return video;
    };

    static async updatePhoto(id: string, data: Partial<VideoData>): Promise<VideoData> {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                userId: "user_id",
                tagId: "tag_id"
            }
        );

        const sqlQuery = `UPDATE videos
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING id,
                                user_id AS "userId",
                                link,
                                about,
                                tag_id AS "tagId"`;
        const result = await db.query(sqlQuery, [...values, id]);
        const video = result.rows[0];

        if(!video) throw new NotFoundError('Video not found!');

        return video;
    }

    static async removeVideo(id: string): Promise<void> {
        const result = await db.query(`
            DELETE FROM videos
                WHERE id = $1
                RETURNING id`,
                [id]);

        const video = result.rows[0];

        if(!video) throw new NotFoundError('Video not found!');
    }
}