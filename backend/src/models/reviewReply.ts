import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface ReviewReplyData {
    id: string;
    userId: string;
    username: string;
    reviewId: string;
    body: string;
    slug: string;
    createdAt: Date;
}

interface ReviewReplyRow {
    id: string;
    userId: string;
    username: string;
    reviewId: string;
    body: string;
    slug: string;
    createdAt: Date;
  }

class ReviewReply {
    static async replyToReview(userId: string, reviewId: string, body: string, slug: string): Promise<ReviewReplyData> {
        const reviewCheck = await db.query(
            `SELECT id
            FROM reviews
            WHERE id = $1`,
            [reviewId]
        );

        const review = reviewCheck.rows[0];

        if(!review) throw new NotFoundError('Review does not exist!')
        
        
        const id = uuidv4();
        const createdAt = new Date();

        const result = await db.query(
            `INSERT INTO review_replies
                (id,
                    user_id,
                    review_id,
                    ski_area_slug,
                    body,
                    created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING 
                id,
                user_id AS "userId",
                review_id AS "reviewId",
                ski_area_slug AS "slug",
                body,
                created_at AS "createdAt"`,
            [   id,
                userId,
                reviewId,
                slug,
                body,
                createdAt
            ]
        );

        const username = await db.query(`
            SELECT username FROM users WHERE id = $1`, [userId]);

        const reviewReplyData = result.rows[0];

        reviewReplyData.username = username;

        const reviewReply: ReviewReplyData = {
            id: reviewReplyData.id,
            userId: reviewReplyData.userId,
            username: reviewReplyData.username,
            reviewId: reviewReplyData.reviewId,
            slug: reviewReplyData.slug,
            body: reviewReplyData.body,
            createdAt: reviewReplyData.createdAt
        }

        return reviewReply;
    };

    static async replyToReviewUpdate(id: string, data: Partial<ReviewReplyData>) {
        const { setCols, values } = sqlForPartialUpdate(data, {});

        const sqlQuery = `UPDATE review_replies
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING user_id AS "userId",
                                        review_id AS "reviewId",
                                        ski_area_slug AS "slug",
                                        body,
                                        created_at AS "createdAt"`;
        const result = await db.query<ReviewReplyRow>(sqlQuery, [...values, id]);
        const reviewReply: ReviewReplyData = {
            id: result.rows[0].id,
            userId: result.rows[0].userId,
            username: result.rows[0].username,
            reviewId: result.rows[0].reviewId,
            slug: result.rows[0].slug,
            body: result.rows[0].body,
            createdAt: result.rows[0].createdAt
          };;

        if(!reviewReply) throw new NotFoundError('Review Reply Not Found!');

        return reviewReply;
    };

    static async fetchRepliesByReviewId(reviewId: string): Promise<ReviewReplyData[]> {
        const result = await db.query(`
            SELECT r.id,
                r.review_id AS "reviewId",
                r.user_id AS "userId",
                u.username,
                r.body,
                r.ski_area_slug AS "slug",
                r.created_at AS "createdAt"
            FROM review_replies r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE review_id = $1`,
            [reviewId]
            );

        const replies = result.rows;

        if(replies.length === 0) throw new NotFoundError('No Replies to this Review');

        return replies;
    };

    static async fetchReplyId(id: string): Promise<ReviewReplyData> {
        const result = await db.query(`
            SELECT r.id,
                r.review_id AS "reviewId",
                r.user_id AS "userId",
                u.username,
                r.body,
                r.ski_area_slug AS "slug",
                r.created_at AS "createdAt"
            FROM review_replies r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE id = $1`,
            [id]
            );

        const reply = result.rows[0];

        if(!reply) throw new NotFoundError('Reply Not Found.');

        return reply;
    };

    static async removeReply(id:string): Promise<void> {
        const result = await db.query(`
            DELETE FROM review_replies
            WHERE id = $1
            RETURNING id`,
            [id]
        );
        const replyToReview = result.rows[0];

        if(!replyToReview) throw new NotFoundError('Review Reply Not Found!');
    }
};

export default ReviewReply;
