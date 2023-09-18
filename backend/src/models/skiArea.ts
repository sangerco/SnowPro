import db from "../db";
import { NotFoundError } from "../expressError";

import {
  SkiAreaReviewData,
  SkiAreasUsersFavoritedBy,
  SkiAreaReviewDataReturn,
} from "../interfaces/skiAreaInterfaces";

class SkiArea {
  static async createSkiArea(slug: string, name: string): Promise<void> {
    const result = await db.query(
      `INSERT INTO ski_areas 
            (   slug,
                name)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING`,
      [slug, name]
    );
  }

  static async returnUsersFavoritedBy(
    slug: string
  ): Promise<SkiAreasUsersFavoritedBy[]> {
    const result = await db.query(
      `
            SELECT s.slug,
                u.id as "userId",
                u.username
                FROM ski_areas s
                LEFT JOIN fav_mountains fm ON s.slug = fm.ski_areas_slug
                LEFT JOIN users u ON fm.user_id = u.id
                WHERE s.slug = $1`,
      [slug]
    );

    return result.rows;
  }

  static async fetchReviewsBySkiAreaSlug(
    slug: string
  ): Promise<SkiAreaReviewDataReturn[]> {
    const result = await db.query(
      `
            SELECT r.id,
                r.user_id AS "userId",
                r.ski_area_slug AS "skiAreaSlug",
                r.header,
                r.body,
                r.stars,
                r.photos,
                r.created_at AS "createdAt",
                u.username,
                s.name AS "skiAreaName"
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug
            WHERE r.ski_area_slug = $1
            ORDER BY r.created_at`,
      [slug]
    );

    const reviews = result.rows;

    if (reviews.length === 0) {
      console.error("No reviews found");
    }

    return reviews;
  }
}

export default SkiArea;
