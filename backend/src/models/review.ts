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
    tagIds: string[];
}

class Review {
    static async createReview(
        userId: string,
        skiAreaSlug: string,
        body: string,
        stars: number,
        photos: string,
        tagIds: string[]
    ): Promise<ReviewData> {

        const id = uuidv4();
        const createdAt = new Date()

        const result = await db.query(
            `INSERT INTO reviews
                (id,
                   user_id,
                   ski_area_slug,
                   body,
                   stars,
                   photos,
                   created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                id,
                user_id AS "userId", 
                ski_area_slug AS "skiAreaSlug", 
                body, 
                stars, 
                photos,
                created_at AS "createdAt"`,
            [   id,
                userId,
                skiAreaSlug,
                body,
                stars,
                photos,
                createdAt
            ]
        )

        const review = result.rows[0];
        
        for (let tagId of tagIds) {
            await db.query(`
                INSERT INTO review_tags (review_id, tag_id)
                VALUES ($1, $2)`,
            [review.id, tagId])

            review.tagIds.push(tagId);
        }

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
                            created_at AS "createdAt"`;
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