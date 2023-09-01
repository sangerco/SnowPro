import db from "../db";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface FavMountainData {
  userId: string;
  username: string;
  skiAreaSlug: string;
}

class FavMountain {
  static async createFavMountain(
    userId: string,
    skiAreaSlug: string
  ): Promise<FavMountainData> {
    const result = await db.query(
      `
            INSERT INTO fav_mountains
            (   user_id,
                ski_areas_slug)
            VALUES ($1, $2)
            RETURNING user_id AS "userId", ski_areas_slug AS "skiAreaSlug"`,
      [userId, skiAreaSlug]
    );
    const favMountain = result.rows[0];

    return favMountain;
  }

  static async fetchFavMountainDataByUserId(userId: string) {
    const result = await db.query(
      `     SELECT u.username,
                    s.slug AS "skiAreaSlug",
                    s.name AS "skiAreaName"
            FROM users u
            LEFT JOIN fav_mountains fm ON u.id = fm.user_id
            LEFT JOIN ski_areas s ON fm.ski_areas_slug = s.slug
            WHERE user_id = $1`,
      [userId]
    );

    const favMountains = result.rows;

    return favMountains;
  }

  static async fetchFavMountainDataBySkiAreaSlug(skiAreaSlug: string) {
    const result = await db.query(
      `
            SELECT s.slug AS "skiAreaSlug",
                    u.user_id AS "userId",
                    u.username,
            FROM ski_areas s
            LEFT JOIN fav_mountains fm ON s.slug = fm.ski_areas_slug
            LEFT JOIN users u ON fm.user_id = u.id
            WHERE slug = $1`,
      [skiAreaSlug]
    );

    const favMountains = result.rows;

    return favMountains;
  }

  static async remove(username: string, slug: string): Promise<void> {
    await db.query(
      `DELETE FROM fav_mountains fm
                LEFT JOIN users u ON u.id = fm.user_id
                WHERE u.username = $1
                AND fm.ski_areas_slug = $2`,
      [username, slug]
    );
  }
}

export default FavMountain;
