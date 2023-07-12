import db from '../db';

import { SkiAreaReviewData } from '../interfaces/skiAreaInterfaces';

class SkiArea {
    static async createSkiArea(slug: string, name: string): Promise<void> {
        
        const result = await db.query(
            `INSERT INTO ski_areas 
            (   slug,
                name)
                VALUES ($1, $2)
                RETURNING slug AS "skiAreaSlug", name`,
            [   slug,
                name
            ]
        );

        return result.rows[0];
    };

    static async returnReviewDataBySlug(slug: string): Promise<SkiAreaReviewData[]> {
        const result = await db.query(
            `SELECT s.slug,
                s.name,
                r.user_id AS "userId",
                r.ski_area_slug AS "skiAreaSlug",
                r.body,
                r.stars,
                r.photos,
                r.tag_ids AS "tagIds"
                FROM ski_areas s
                JOIN reviews r ON s.slug = r.ski_area_slug
                WHERE s.slug = $1`,
                [slug]
        )

        return result.rows;
    }
}

export default SkiArea;