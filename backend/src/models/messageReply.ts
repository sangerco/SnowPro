import db from "../db";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from 'uuid';
import { UsernameWithId } from "./message";

interface ReplyData {
    id: string;
    messageId: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
}

interface UserWithReplies extends ReplyData {
    usernameWithId: UsernameWithId
}

class Reply {
    static async createReply(messageId: string, senderId: string, recipientId: string, subject: string, body: string): Promise<ReplyData> {
        const id = uuidv4();

        const result = await db.query(`
            INSERT INTO message_replies
            (   id,
                message_id,
                sender_id,
                recipient_id,
                subject,
                body)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING 
                id,
                message_id AS "messageId",
                sender_id AS "senderId",
                recipient_id AS "recipientId",
                subject,
                body`,
            [   id,
                messageId,
                senderId,
                recipientId,
                subject,
                body
            ]
        );

        const reply = result.rows[0];

        return reply;
    };

    static async getReplyById(id: string): Promise<ReplyData> {
        const result = await db.query(`
            SELECT 
                id,
                message_id AS "messageId",
                sender_id AS "senderId",
                recipient_id AS "recipientId",
                subject,
                body
                FROM message_replies
                WHERE id = $1`,
                [id]
            );

            const reply = result.rows[0];

            return reply;
    };

    static async getRepliesByMessageId(messageId: string): Promise<ReplyData[]> {
        const result = await db.query(`
            SELECT FROM message_replies
                WHERE message_id = $1
                RETURNING id,
                message_id AS "messageId",
                sender_id AS "senderId",
                recipient_id AS "recipientId",
                subject,
                body`,
            [ messageId ]
        );

        const replies = result.rows;

        return replies;
    };

    static async getReceivedRepliesByUsername(username: string): Promise<UserWithReplies[]> {
        const result = await db.query(`
            SELECT 
                u.username,
                u.id,
                r.id,
                r.message_id AS "messageId",
                r.sender_id AS "senderId",
                r.recipient_id AS "recipientId",
                r.subject,
                r.body,
            FROM users u 
            JOIN message_replies r on u.id = r.recipient_id
            WHERE u.username = $1`,
            [ username ]
        );

        const replies = result.rows;

        return replies;
    };

    static async getSentRepliesByUsername(username: string): Promise<UserWithReplies[]> {
        const result = await db.query(`
            SELECT 
                u.username,
                u.id,
                r.id,
                r.message_id AS "messageId",
                r.sender_id AS "senderId",
                r.recipient_id AS "recipientId",
                r.subject,
                r.body,
            FROM users u 
            JOIN message_replies r on u.id = r.sender_id
            WHERE u.username = $1`,
            [ username ]
        );

        const replies = result.rows;

        return replies;
    };

    static async deleteReply(id: string): Promise<void> {
        const result = await db.query(`
            DELETE FROM message_replies
                WHERE id = $1
                RETURNING id`,
                [id]
            );

        const reply = result.rows[0];

        if (!reply) throw new NotFoundError('Message does not exist!');
    };

};

export default Reply;