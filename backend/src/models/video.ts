import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface VideoData {
    id: string;
    userId: string;
    link: string;
    about: string;
    tagIds: string[];
    tags: string[];
}

class Video {
    static async createVideo(userId: string, link: string, about: string, tagIds: string[]): Promise<VideoData> {
        const id = uuidv4();

        const result = await db.query( `
            INSERT INTO videos
                (   id,
                    user_id,
                    link,
                    about)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING 
                    id,
                    user_id AS "userId",
                    link,
                    about`,
            [id, userId, link, about]
        );

        const video = result.rows[0];

        for (let tagId of tagIds) {
            await db.query(`
                INSERT INTO review_tags (review_id, tag_id)
                VALUES ($1, $2)`,
            [video.id, tagId])

            video.tagIds.push(tagId);
        }

        return video;
    };

    static async getVideo(id:string): Promise<VideoData> {
        const result = await db.query(
            `SELECT v.id,
                v.user_id AS "userId",
                v.link,
                v.about,
                v.tag_id AS "tagId",
                t.tag
                FROM videos v
                LEFT JOIN videos_tags vt ON v.tag_id = vt.tag_id
                LEFT JOIN tags t ON vt.tag_id = t.id
                WHERE v.id = $1`,
            [id]
        )

        const video = result.rows[0];

        if(!video) throw new NotFoundError('Photo Not Found');

        return video;
    };

    static async updatePhoto(id: string, data: Partial<VideoData>): Promise<VideoData> {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                userId: "user_id"
            }
        );

        const sqlQuery = `UPDATE videos
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING id,
                                user_id AS "userId",
                                link,
                                about`;
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

export default Video;