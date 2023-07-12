import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface ReviewData {
    id: string;
    userId: string;
    skiAreaSlug: string;
    body: string;
    stars: number;
    photos: string;
    tagIds: string
}

class Review {
    static async createReview(
        userId: string,
        skiAreaSlug: number,
        body: string,
        stars: number,
        photos: string,
        tagIds: string
    ): Promise<ReviewData> {

        const id = uuidv4();

        const result = await db.query(
            `INSERT INTO reviews
                (id,
                   user_id,
                   ski_area_slug,
                   body,
                   stars,
                   photos,
                   tag_ids)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                id,
                user_id AS "userId", 
                ski_area_slug AS "skiAreaSlug", 
                body, 
                stars, 
                photos, 
                tag_ids AS "tagIds"`,
            [   id,
                userId,
                skiAreaSlug,
                body,
                stars,
                photos,
                tagIds
            ]
        )

        const review = result.rows[0];

        return review;
    }
    static async updateReview(id: string, data: Partial<ReviewData>): Promise<ReviewData> {

        const { setCols, values } = sqlForPartialUpdate(
            data, 
            {
                tagIds: 'tag_ids'
            }
        );

        const sqlQuery = `UPDATE reviews
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING user_id AS "userId",
                            ski_area_slug AS "skiAreaSlug",
                            body,
                            stars,
                            photos,
                            tag_ids AS "tagIds"`;
        const result = await db.query(sqlQuery, [...values, id])
        const review = result.rows[0];

        if (!review) throw new NotFoundError('No such review found.')

        return review;
    }

    static async removeReview(id: string): Promise<void> {
        const result = await db.query(`
                                DELETE FROM reviews
                                WHERE id = $1
                                RETURNING id`,
                                [id]);
        const review = result.rows[0];

        if (!review) throw new NotFoundError('No such review found.')
    }
}

export default Review;