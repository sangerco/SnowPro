import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface ReviewData {
    id: string;
    userId: string;
    skiAreaSlug: string;
    skiAreaName: string;
    body: string;
    stars: number;
    photos: string[];
    tagIds: string[];
}

interface ReviewDataReturn {
    id: string;
    userId: string;
    username: string;
    skiAreaSlug: string;
    skiAreaName: string;
    body: string;
    stars: number;
    photos: string[];
    tagsId: string[];
}

class Review {
    static async createReview(
        userId: string,
        skiAreaSlug: string,
        body: string,
        stars: number,
        photos: string[],
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
                   tag_ids,
                   created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                id,
                user_id AS "userId", 
                ski_area_slug AS "skiAreaSlug", 
                body, 
                stars, 
                photos,
                tag_ids AS "tagIds",
                created_at AS "createdAt"`,
            [   id,
                userId,
                skiAreaSlug,
                body,
                stars,
                photos,
                tagIds,
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

    static async fetchReviewsBySkiArea(skiAreaName: string): Promise<ReviewDataReturn[]> {
        const result = await db.query(`
            SELECT r.id,
                r.user_id AS "userId",
                r.ski_area_slug AS "skiAreaSlug",
                r.body,
                r.stars,
                r.photos,
                u.username,
                s.name AS "skiAreaName",
                t.tag
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug
            LEFT JOIN review_tags rt ON r.tag_ids = rt.tag_id
            LEFT JOIN tags t ON rt.tag_id = t.id
            WHERE s.name = $1
            ORDER BY r.created_at`,
            [skiAreaName]);

        const reviews = result.rows;

        if(reviews.length === 0) {
            throw new NotFoundError('No reviews found')
        };

        return reviews;
    }

    static async fetchReviewById(id: string): Promise<ReviewDataReturn> {
        const result = await db.query(`
            SELECT r.id,
                r.user_id AS "userId",
                r.ski_area_slug AS "skiAreaSlug",
                r.body,
                r.stars,
                r.photos,
                u.username,
                s.name AS "skiAreaName",
                t.tag
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug
            LEFT JOIN review_tags rt ON r.tag_ids = rt.tag_id
            LEFT JOIN tags t ON rt.tag_id = t.id
            WHERE r.id = $1
            ORDER BY r.created_at`,
            [id]);

            const review = result.rows[0];

            if(!review) throw new NotFoundError('Review Not Found');

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