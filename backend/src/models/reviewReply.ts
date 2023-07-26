import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface ReviewReplyData {
    id: string;
    userId: string;
    reviewId: string;
    body: string;
}

interface ReviewReplyRow {
    id: string;
    userId: string;
    reviewId: string;
    body: string;
  }

class ReviewReply {
    static async replyToReview(userId: string, reviewId: string, body: string): Promise<ReviewReplyData> {
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
                    body,
                    created_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING 
                id,
                user_id AS "userId",
                review_id AS "reviewId",
                body,
                created_at AS "createdAt"`,
            [   id,
                userId,
                reviewId,
                body,
                createdAt
            ]
        );

        const reviewReply = result.rows[0];

        return reviewReply;
    };

    static async replyToReviewUpdate(id: string, data: Partial<ReviewReplyData>) {
        const { setCols, values } = sqlForPartialUpdate(data, {});

        const sqlQuery = `UPDATE review_replies
                            SET ${setCols}
                            WHERE id = ${id}
                            RETURNING user_id AS "userId",
                                        review_id AS "reviewId",
                                        body,
                                        created_at AS "createdAt"`;
        const result = await db.query<ReviewReplyRow>(sqlQuery, [...values, id]);
        const reviewReply: ReviewReplyData = {
            id: result.rows[0].id,
            userId: result.rows[0].userId,
            reviewId: result.rows[0].reviewId,
            body: result.rows[0].body
          };;

        if(!reviewReply) throw new NotFoundError('Review Reply Not Found!');

        return reviewReply;
    };

    static async removeReply(id:string): Promise<void> {
        const result = await db.query(`
            DELETE FROM review_replies
            WHERE id = $1
            RETURNING id`,
            [id]
        );
        const replyToReview = result.rows[0];

        if(!replyToReview) throw new NotFoundError('Review Reply Not Found!')
    }
};

export default ReviewReply;
