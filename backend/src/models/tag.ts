import db from "../db";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface TagData {
  id: string;
  tag: string;
}

interface AssociatedData {
  tagId: string;
  tag: string;
  reviewIds: string[];
  photoIds: string[];
  photoLinks: string[];
  videoIds: string[];
  videoLinks: string[];
}

class Tag {
  static async createTag(tag: string): Promise<TagData> {
    const id = uuidv4();

    const result = await db.query(
      `
                INSERT INTO tags (id, tag)
                    VALUES ($1, $2)
                    RETURNING id, tag`,
      [id, tag]
    );

    const newTag = result.rows[0];

    return newTag;
  }

  static async getTags(): Promise<TagData[]> {
    const result = await db.query(`
            SELECT * FROM tags`);

    const tags = result.rows;

    return tags;
  }

  // method to get all reviews, photos, and videos associated with that tag

  static async getAssociatedItems(id: string): Promise<AssociatedData> {
    const result = await db.query(
      `SELECT t.id AS "tagId",
                    t.tag,
                    r.id AS "reviewIds",
                    p.id AS "photoIds",
                    p.link AS "photoLinks",
                    v.id AS "videoIds",
                    v.link AS "videoLinks"
                FROM tags
                LEFT JOIN reviews_tags rt ON t.id = rt.tag_id
                LEFT JOIN reviews r ON rt.review_id = r.id
                LEFT JOIN photos_tags pt ON t.id = pt.tag_id
                LEFT JOIN photos p ON pt.photo_id = p.id
                LEFT JOIN video_tags vt ON t.id =  vt.tag_id
                LEFT JOIN videos v ON vt.tag_id = v.id
                WHERE id = $1`,
      [id]
    );

    const rows = result.rows;

    if (rows.length === 0) throw new NotFoundError("Tag Not Found");

    const tag: AssociatedData = {
      tagId: rows[0].tagId,
      tag: rows[0].tag,
      reviewIds: rows.map((row) => row.reviewIds).filter((id) => id !== null),
      photoIds: rows.map((row) => row.photoIds).filter((id) => id !== null),
      photoLinks: rows
        .map((row) => row.photoLinks)
        .filter((link) => link !== null),
      videoIds: rows.map((row) => row.videoIds).filter((id) => id !== null),
      videoLinks: rows
        .map((row) => row.videoLinks)
        .filter((link) => link !== null),
    };

    return tag;
  }

  static async deleteTag(id: string): Promise<void> {
    const result = await db.query(
      `
                DELETE FROM tags
                WHERE id = $1
                RETURNING id`,
      [id]
    );
    const tag = result.rows[0];

    if (!tag) throw new NotFoundError("Tag not found.");
  }
}

export default Tag;
