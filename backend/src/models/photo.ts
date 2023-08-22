import db from "../db";
import { sqlForPartialUpdate } from "../helpers/sql";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface PhotoData {
  id: string;
  userId: string;
  username: string;
  link: string;
  about: string;
  tagIds: string[];
  createdAt: Date;
}

class Photo {
  static async createPhoto(
    username: string,
    link: string,
    about: string,
    tagIds: string[]
  ): Promise<PhotoData> {
    const id = uuidv4();
    const createdAt = new Date();

    const userId = await db.query(
      `
            SELECT id
                FROM users
                WHERE username = $1`,
      [username]
    );

    const result = await db.query(
      `
            INSERT INTO photos
                (   id,
                    user_id,
                    link,
                    about,
                    created_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING 
                    id,
                    user_id AS "userId",
                    link,
                    about
                    created_at AS "createdAt"`,
      [id, userId, link, about, createdAt]
    );

    const photo = result.rows[0];

    for (let tagId of tagIds) {
      await db.query(
        `
                INSERT INTO photo_tags (photo_id, tag_id)
                VALUES ($1, $2)`,
        [photo.id, tagId]
      );

      photo.tagIds.push(tagId);
    }

    return photo;
  }

  static async getPhoto(id: string): Promise<PhotoData> {
    const result = await db.query(
      `SELECT p.id,
                p.user_id AS "userId",
                p.link,
                p.about,
                p.tag_id AS "tagId",
                p.created_at AS "createdAt",
                u.username,
                t.tag
                FROM photos p
                LEFT JOIN users u ON p.user_id = u.id
                LEFT JOIN photos_tags pt ON p.tag_id = pt.tag_id
                LEFT JOIN tags t ON pt.tag_id = t.id
                WHERE p.id = $1
                ORDER BY p.created_at`,
      [id]
    );

    const photo = result.rows[0];

    if (!photo) throw new NotFoundError("Photo Not Found");

    return photo;
  }

  static async getPhotosByUsername(username: string): Promise<PhotoData[]> {
    const result = await db.query(
      `SELECT u.id AS "userId",
                u.username,
                p.id,
                p.user_id,
                p.link,
                p.about,
                p.tag_id AS "tagId",
                p.created_at AS "createdAt",
                t.tag
                FROM users u
                LEFT JOIN photos p ON u.id = p.user_id
                LEFT JOIN photos_tags pt ON p.tag_id = pt.tag_id
                LEFT JOIN tags t ON pt.tag_id = t.id
                WHERE u.username = $1
                ORDER BY p.created_at`,
      [username]
    );

    const photos = result.rows;

    if (photos.length === 0) throw new NotFoundError("No photos yet.");

    return photos;
  }

  static async updatePhoto(
    id: string,
    data: Partial<PhotoData>
  ): Promise<PhotoData> {
    const { setCols, values } = sqlForPartialUpdate(data, {
      userId: "user_id",
    });

    const sqlQuery = `UPDATE photos
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING id,
                                user_id AS "userId",
                                link,
                                about,
                                created_at as "createdAt"`;
    const result = await db.query(sqlQuery, [...values, id]);
    const photo = result.rows[0];

    if (!photo) throw new NotFoundError("Photo not found!");

    return photo;
  }

  static async removePhoto(id: string): Promise<void> {
    const result = await db.query(
      `
            DELETE FROM photos
                WHERE id = $1
                RETURNING id`,
      [id]
    );

    const photo = result.rows[0];

    if (!photo) throw new NotFoundError("Photo not found!");
  }
}

export default Photo;
