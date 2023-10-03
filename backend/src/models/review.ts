import db from "../db";
import { sqlForPartialUpdate } from "../helpers/sql";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface ReviewData {
  id: string;
  userId: string;
  username?: string;
  skiAreaSlug: string;
  skiAreaName: string | null;
  header: string;
  body: string;
  stars: number;
  photos: string[];
}

interface ReviewDataReturn {
  id: string;
  userId: string;
  username: string;
  skiAreaSlug: string;
  skiAreaName: string;
  header: string;
  body: string;
  stars: number;
  photos: string[];
  createdAt: Date;
}

class Review {
  static async createReview(
    user_id: string,
    ski_area_slug: string,
    header: string,
    body: string,
    stars: number,
    photos: string[]
  ): Promise<ReviewData> {
    const id = uuidv4();
    const createdAt = new Date();

    const result = await db.query(
      `INSERT INTO reviews
                (id,
                   user_id,
                   ski_area_slug,
                   header,
                   body,
                   stars,
                   created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                id,
                user_id AS "userId", 
                ski_area_slug AS "skiAreaSlug", 
                header,
                body, 
                stars,
                created_at AS "createdAt"`,
      [id, user_id, ski_area_slug, header, body, stars, createdAt]
    );

    const reviewData = result.rows[0];

    let photoIds: string[] = [];

    for (let photo of photos) {
      const photoId = uuidv4();
      const photoCreatedAt = new Date();

      await db.query(
        `   INSERT INTO photos (
                    id,
                    user_id,
                    link,
                    created_at)
                VALUES ($1, $2, $3, $4)
                RETURNING
                    id,
                    user_id AS "userId",
                    link,
                    created_at AS "createdAt"`,
        [photoId, user_id, photo, photoCreatedAt]
      );

      await db.query(
        `   INSERT INTO reviews_photos (review_id, photo_id)
                VALUES ($1, $2)`,
        [reviewData.id, photoId]
      );

      photoIds.push(photoId);
    }

    const skiAreaName = await db.query(
      `
            SELECT name AS "skiAreaName" FROM ski_areas WHERE slug = $1`,
      [ski_area_slug]
    );

    reviewData.skiAreaName = skiAreaName.rows[0].skiAreaName;

    const review: ReviewData = {
      id: reviewData.id,
      userId: reviewData.userId,
      skiAreaSlug: reviewData.skiAreaSlug,
      skiAreaName: reviewData.skiAreaName,
      header: reviewData.header,
      body: reviewData.body,
      stars: reviewData.stars,
      photos: photoIds,
    };

    return review;
  }
  static async updateReview(
    id: string,
    data: Partial<ReviewData>
  ): Promise<ReviewData> {
    const { setCols, values } = sqlForPartialUpdate(data, {
      userId: "user_id",
    });

    const sqlQuery = `UPDATE reviews
                            SET ${setCols}
                            WHERE id = '${id}'
                            RETURNING id,
                            user_id AS "userId",
                            ski_area_slug AS "skiAreaSlug",
                            header,
                            body,
                            stars,
                            photos,
                            created_at AS "createdAt"`;
    const result = await db.query(sqlQuery, values);
    const reviewData = result.rows[0];

    let photoLinks: string[] = [];

    if (data.photos) {
      for (let photoLink of data.photos) {
        const photoId = uuidv4();
        const photoCreatedAt = new Date();

        await db.query(
          `INSERT INTO photos (id, user_id, link, created_at)
                          VALUES ($1, $2, $3, $4)
                          RETURNING id`,
          [photoId, reviewData.userId, photoLink, photoCreatedAt]
        );
        await db.query(
          `INSERT INTO reviews_photos (review_id, photo_id)
                          values ($1, $2)`,
          [reviewData.id, photoId]
        );
        photoLinks.push(photoId);
      }
    } else {
      const photoQuery = await db.query(
        `     SELECT p.link 
            FROM photos p 
            LEFT JOIN reviews_photos rp ON p.id = rp.photo_id 
            LEFT JOIN reviews r ON rp.review_id = r.id 
            WHERE r.id = $1`,
        [id]
      );

      const photos = photoQuery.rows;

      for (let photo of photos) {
        photoLinks.push(photo.link);
      }
    }

    if (!reviewData) throw new NotFoundError("No such review found.");

    const review: ReviewDataReturn = {
      id: reviewData.id,
      userId: reviewData.userId,
      username: reviewData.username,
      skiAreaSlug: reviewData.skiAreaSlug,
      skiAreaName: reviewData.skiAreaName,
      header: reviewData.header,
      body: reviewData.body,
      stars: reviewData.stars,
      photos: photoLinks,
      createdAt: reviewData.createdAt,
    };

    return review;
  }

  static async fetchReviewsBySkiArea(
    skiAreaName: string
  ): Promise<ReviewDataReturn[]> {
    const result = await db.query(
      `
            SELECT r.id,
                r.user_id AS "userId",
                r.ski_area_slug AS "skiAreaSlug",
                r.header,
                r.body,
                r.stars,
                r.created_at AS "createdAt",
                u.username,
                s.name AS "skiAreaName"
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug
            LEFT JOIN reviews_photos rp ON r.photos = rp.photo_id
            LEFT JOIN photos p ON rp.photo_id = p.id
            WHERE s.name = $1
            ORDER BY r.created_at`,
      [skiAreaName]
    );

    const reviewData = result.rows;

    let reviews: ReviewDataReturn[] = [];

    for (let review of reviewData) {
      let photoLinks: string[] = [];

      const photoQuery = await db.query(
        `     SELECT p.link 
              FROM photos p 
              LEFT JOIN reviews_photos rp ON p.id = rp.photo_id 
              LEFT JOIN reviews r ON rp.review_id = r.id 
              WHERE r.id = $1`,
        [review.id]
      );

      const photos = photoQuery.rows;

      for (let photo of photos) {
        photoLinks.push(photo.link);
      }

      const oneReview: ReviewDataReturn = {
        id: review.id,
        userId: review.userId,
        username: review.username,
        skiAreaSlug: review.skiAreaSlug,
        skiAreaName: review.skiAreaName,
        header: review.header,
        body: review.body,
        stars: review.stars,
        photos: photoLinks,
        createdAt: review.createdAt,
      };

      reviews.push(oneReview);
    }

    if (reviews.length === 0) {
      throw new NotFoundError("No reviews found");
    }

    return reviews;
  }

  static async fetchReviewById(id: string): Promise<ReviewDataReturn> {
    const result = await db.query(
      `
            SELECT r.id,
                r.user_id AS "userId",
                r.ski_area_slug AS "skiAreaSlug",
                r.header,
                r.body,
                r.stars,
                u.username,
                s.name AS "skiAreaName",
                r.created_at AS "createdAt"
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug
            WHERE r.id = $1`,
      [id]
    );

    const reviewData = result.rows[0];

    let photoLinks: string[] = [];

    const photoQuery = await db.query(
      `     SELECT p.link 
            FROM photos p 
            LEFT JOIN reviews_photos rp ON p.id = rp.photo_id 
            LEFT JOIN reviews r ON rp.review_id = r.id 
            WHERE r.id = $1`,
      [id]
    );

    const photos = photoQuery.rows;

    for (let photo of photos) {
      photoLinks.push(photo.link);
    }

    const review: ReviewDataReturn = {
      id: reviewData.id,
      userId: reviewData.userId,
      username: reviewData.username,
      skiAreaSlug: reviewData.skiAreaSlug,
      skiAreaName: reviewData.skiAreaName,
      header: reviewData.header,
      body: reviewData.body,
      stars: reviewData.stars,
      photos: photoLinks,
      createdAt: reviewData.createdAt,
    };

    if (!review) throw new NotFoundError("Review Not Found");

    return review;
  }

  static async getAllReviews(): Promise<ReviewDataReturn[]> {
    const result = await db.query(`
                SELECT r.id,
                    r.user_id AS "userId",
                    r.ski_area_slug AS "skiAreaSlug",
                    r.header,
                    r.body,
                    r.stars,
                    p.link AS "photos",
                    u.username,
                    s.name AS "skiAreaName"
                FROM reviews r
                LEFT JOIN users u ON r.user_id = u.id
                LEFT JOIN ski_areas s ON r.ski_area_slug = s.slug
                LEFT JOIN reviews_photos rp ON r.id = rp.review_id
                LEFT JOIN photos p ON rp.photo_id = p.id
                ORDER BY r.created_at
                `);

    const reviewData = result.rows;

    let reviews: ReviewDataReturn[] = [];

    for (let review of reviewData) {
      let photoLinks: string[] = [];

      const photoQuery = await db.query(
        `     SELECT p.link 
                          FROM photos p 
                          LEFT JOIN reviews_photos rp ON p.id = rp.photo_id 
                          LEFT JOIN reviews r ON rp.review_id = r.id 
                          WHERE r.id = $1`,
        [review.id]
      );

      const photos = photoQuery.rows;

      for (let photo of photos) {
        photoLinks.push(photo.link);
      }

      const oneReview: ReviewDataReturn = {
        id: review.id,
        userId: review.userId,
        username: review.username,
        skiAreaSlug: review.skiAreaSlug,
        skiAreaName: review.skiAreaName,
        header: review.header,
        body: review.body,
        stars: review.stars,
        photos: photoLinks,
        createdAt: review.createdAt,
      };

      reviews.push(oneReview);
    }

    if (reviews.length === 0) {
      throw new NotFoundError("No reviews found");
    }

    return reviews;
  }

  static async removeReview(id: string): Promise<void> {
    const result = await db.query(
      `
                                DELETE FROM reviews
                                WHERE id = $1
                                RETURNING id`,
      [id]
    );
    const review = result.rows[0];

    if (!review) throw new NotFoundError("No such review found.");
  }
}

export default Review;
