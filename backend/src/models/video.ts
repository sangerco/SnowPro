import db from "../db";
import { sqlForPartialUpdate } from "../helpers/sql";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface VideoData {
  id: string;
  userId: string;
  username: string;
  link: string;
  about: string;
  tagIds: string[];
  tags: string[];
  createdAt: Date;
}

class Video {
  static async createVideo(
    username: string,
    link: string,
    about: string,
    tagIds: string[]
  ): Promise<VideoData> {
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
            INSERT INTO videos
                (   id,
                    user_id,
                    link,
                    about,
                    created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING 
                    id,
                    user_id AS "userId",
                    link,
                    about,
                    created_at AS "createdAt"`,
      [id, userId, link, about, createdAt]
    );

    const video = result.rows[0];

    for (let tagId of tagIds) {
      await db.query(
        `
                INSERT INTO videos_tags (videos_id, tag_id)
                VALUES ($1, $2)`,
        [video.id, tagId]
      );

      video.tagIds.push(tagId);
    }

    return video;
  }

  static async getVideo(id: string): Promise<VideoData> {
    const result = await db.query(
      `SELECT v.id,
                v.user_id AS "userId",
                v.link,
                v.about,
                v.tag_id AS "tagId",
                v.created_at AS "createdAt",
                u.username,
                t.tag
                FROM videos v
                LEFT JOIN users u ON v.user_id = u.id
                LEFT JOIN videos_tags vt ON v.tag_id = vt.tag_id
                LEFT JOIN tags t ON vt.tag_id = t.id
                WHERE v.id = $1
                ORDER BY v.created_at`,
      [id]
    );

    const video = result.rows[0];

    if (!video) throw new NotFoundError("Photo Not Found");

    return video;
  }

  static async getVideosByUsername(username: string): Promise<VideoData[]> {
    const result = await db.query(
      `SELECT u.id AS "userId",
                u.username,
                v.id,
                v.user_id,
                v.link,
                v.about,
                v.tag_id AS "tagId",
                v.created_at AS "createdAt",
                t.tag
                FROM users u
                LEFT JOIN videos v ON u.id = v.user_id
                LEFT JOIN videos_tags vt ON v.tag_id = vt.tag_id
                LEFT JOIN tags t ON vt.tag_id = t.id
                WHERE u.username = $1
                ORDER BY v.created_at`,
      [username]
    );

    const videos = result.rows;

    if (videos.length === 0) throw new NotFoundError("No videos yet.");

    return videos;
  }

  static async updateVideo(
    id: string,
    data: Partial<VideoData>
  ): Promise<VideoData> {
    const { setCols, values } = sqlForPartialUpdate(data, {
      userId: "user_id",
    });

    const sqlQuery = `UPDATE videos
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING id,
                                user_id AS "userId",
                                link,
                                about,
                                created_at`;
    const result = await db.query(sqlQuery, [...values, id]);
    const video = result.rows[0];

    if (!video) throw new NotFoundError("Video not found!");

    return video;
  }

  static async removeVideo(id: string): Promise<void> {
    const result = await db.query(
      `
            DELETE FROM videos
                WHERE id = $1
                RETURNING id`,
      [id]
    );

    const video = result.rows[0];

    if (!video) throw new NotFoundError("Video not found!");
  }
}

export default Video;
