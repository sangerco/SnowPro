import db from '../db';

import { SkiAreaReviewData, SkiAreasUsersFavoritedBy } from '../interfaces/skiAreaInterfaces';

class SkiArea {
    static async createSkiArea(slug: string, name: string): Promise<void> {
        
        const result = await db.query(
            `INSERT INTO ski_areas 
            (   slug,
                name)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING`,
            [   slug,
                name
            ]
        );
    };

    static async returnUsersFavoritedBy(slug: string): Promise<SkiAreasUsersFavoritedBy[]> {
        const result = await db.query(`
            SELECT s.slug,
                u.id as "userId",
                u.username
                FROM ski_areas s
                LEFT JOIN fav_mountains fm ON s.slug = fm.ski_areas_slug
                LEFT JOIN users u ON fm.user_id = u.id
                WHERE s.slug = $1`,
            [slug]
        )

        return result.rows;
    }

    static async returnReviewDataBySlug(slug: string): Promise<SkiAreaReviewData[]> {
        const result = await db.query(
            `SELECT s.slug,
                s.name,
                r.user_id AS "userId",
                r.ski_area_slug AS "skiAreaSlug",
                r.body,
                r.stars,
                r.photos,
                r.tag_ids AS "tagIds",
                t.tag AS "tags"
                FROM ski_areas s
                LEFT JOIN reviews r ON s.slug = r.ski_area_slug
                LEFT JOIN review_tags rt ON r.tag_ids = rt.tag_id
                LEFT JOIN tags t ON rt.tag_id = t.id
                WHERE s.slug = $1`,
                [slug]
        )

        return result.rows;
    }
}

export default SkiArea;