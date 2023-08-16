import db from "../db";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface FavMountainData {
  userId: string;
  skiAreaSlug: string;
}

class FavMountain {
  static async createFavMountain(
    userId: string,
    skiAreaSlug: string
  ): Promise<FavMountainData> {
    const id = uuidv4();

    const result = await db.query(
      `
            INSERT INTO fav_mountains
            (   id,
                user_id,
                ski_area_slug)
            VALUES ($1, $2, $3)
            RETURNING id, user_id AS "userId, ski_area_slug AS "skiAreaSlug`,
      [id, userId, skiAreaSlug]
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
            LEFT JOIN ski_areas s ON fm.ski_area_slug = s.slug
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
            LEFT JOIN fav_mountains fm ON s.slug = fm.ski_area_slug
            LEFT JOIN users u ON fm.user_id = u.id
            WHERE slug = $1`,
      [skiAreaSlug]
    );

    const favMountains = result.rows;

    return favMountains;
  }

  static async remove(id: string): Promise<void> {
    const result = await db.query(
      `DELETE FROM fav_mountains
                WHERE id = $1
                RETURNING id`,
      [id]
    );
    const favMountain = result.rows[0];

    if (!favMountain) throw new NotFoundError("Favorite not found!");
  }
}

export default FavMountain;
