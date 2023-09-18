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
  createdAt: Date;
}

interface MediaData {
  id: string;
  userId: string;
  username: string;
  link: string;
  about: string;
  createdAt: string;
}

class Photo {
  static async createPhoto(
    username: string,
    link: string,
    about: string
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

    return photo;
  }

  static async getPhoto(id: string): Promise<PhotoData> {
    const result = await db.query(
      `SELECT p.id,
                p.user_id AS "userId",
                p.link,
                p.about,
                p.created_at AS "createdAt",
                u.username
                FROM photos p
                LEFT JOIN users u ON p.user_id = u.id
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
                p.created_at AS "createdAt"
                FROM users u
                LEFT JOIN photos p ON u.id = p.user_id
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

  static async getAllMedia(): Promise<MediaData[]> {
    const photoResult = await db.query(
      `SELECT p.id,
                p.user_id AS "userId",
                p.link,
                p.about,
                p.created_at AS "createdAt",
                u.username
                FROM photos p
                LEFT JOIN users u ON p.user_id = u.id
                ORDER BY p.created_at
                LIMIT 5`
    );

    const videoResult = await db.query(
      `SELECT v.id,
                v.user_id AS "userId",
                v.link,
                v.about,
                v.created_at AS "createdAt",
                u.username
            FROM videos v
            LEFT JOIN users u ON v.user_id = u.id
            ORDER BY v.created_at
            LIMIT 5;
  `
    );

    const photos = photoResult.rows;
    const videos = videoResult.rows;

    const media: MediaData[] = photos.concat(videos);
    console.log(media);

    media.sort((a, b) => {
      const dateA: Date = new Date(a.createdAt);
      const dateB: Date = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });

    return media;
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

  static async deletePhotoByUsernameAndLink(
    userId: string,
    link: string
  ): Promise<PhotoData> {
    const result = await db.query(
      `DELETE FROM photos
              WHERE user_id = $1
              AND link = $2
              returning id`,
      [userId, link]
    );

    const photo = result.rows[0];

    if (!photo) throw new NotFoundError("Photo not found!");

    return photo;
  }
}

export default Photo;
