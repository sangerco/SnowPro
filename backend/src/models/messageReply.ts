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
    isRead: boolean;
    createdId: Date;
    senderUsername: string;
    senderFirstName: string;
    senderLastName: string;
    recipientUsername: string;
    recipientFirstName: string;
    recipientLastName: string;
}

interface UserWithReplies extends ReplyData {
    usernameWithId: UsernameWithId
}

class Reply {
    static async createReply(messageId: string, senderId: string, recipientId: string, subject: string, body: string): Promise<ReplyData> {
        const id = uuidv4();
        const created_at = new Date();

        const result = await db.query(`
            INSERT INTO message_replies
            (   id,
                message_id,
                sender_id,
                recipient_id,
                subject,
                body,
                created_at,
                is_read)
            VALUES ($1, $2, $3, $4, $5, $6, false)
            RETURNING 
                id,
                message_id AS "messageId",
                sender_id AS "senderId",
                recipient_id AS "recipientId",
                subject,
                body,
                is_read AS "isRead",
                created_at AS "createdAt"`,
            [   id,
                messageId,
                senderId,
                recipientId,
                subject,
                body,
                created_at
            ]
        );

        const reply = result.rows[0];

        return reply;
    };

    static async getReplyById(id: string): Promise<ReplyData> {
        const result = await db.query(`
            SELECT 
                r.id,
                r.message_id AS "messageId",
                r.sender_id AS "senderId",
                r.recipient_id AS "recipientId",
                r.subject,
                r.body,
                r.is_read AS "isRead",
                r.created_at AS "createdAt",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName",            
                recipient.username AS "recipientUsername",
                recipient.first_name AS "recipientFirstName",
                recipient.last_name AS "recipientLastName"
            FROM message_replies r
            JOIN users sender ON r.sender_id = sender.id
            JOIN users recipient ON r.recipient_id = recipient.id
            WHERE r.id = $1
            ORDER BY r.created_at`,
            [id]
            );

            const reply = result.rows[0];

            return reply;
    };

    static async getRepliesByMessageId(messageId: string): Promise<ReplyData[]> {
        const result = await db.query(`
            SELECT 
                r.id,
                r.message_id AS "messageId",
                r.sender_id AS "senderId",
                r.recipient_id AS "recipientId",
                r.subject,
                r.body,
                r.is_read AS "isRead",
                r.created_at AS "createdAt",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName",            
                recipient.username AS "recipientUsername",
                recipient.first_name AS "recipientFirstName",
                recipient.last_name AS "recipientLastName"                
                FROM message_replies r
                JOIN users sender ON r.sender_id = sender.id
                JOIN users recipient ON r.recipient_id = recipient.id
                WHERE r.message_id = $1
                ORDER BY r.created_at`,
            [ messageId ]
        );

        const replies = result.rows;

        return replies;
    };

    static async getReceivedRepliesByUsername(username: string): Promise<UserWithReplies[]> {
        const result = await db.query(`
            SELECT 
                r.id,
                r.message_id AS "messageId",
                r.sender_id AS "senderId",
                r.recipient_id AS "recipientId",
                r.subject,
                r.body,
                r.is_read AS "isRead",
                r.created_at AS "createdAt",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName",
                recipient.username AS "recipientUsername",
                recipient.first_name AS "recipientFirstName",
                recipient.last_name AS "recipientLastName"
            FROM message_replies r
            JOIN users sender on r.sender_id = sender.id
            JOIN users recipient on r.recipient_id = recipient.id
            WHERE recipient.username = $1
            ORDER BY r.created_at`,
            [ username ]
        );

        const replies = result.rows;

        return replies;
    };

    static async getSentRepliesByUsername(username: string): Promise<UserWithReplies[]> {
        const result = await db.query(`
            SELECT 
                r.id,
                r.message_id AS "messageId",
                r.sender_id AS "senderId",
                r.recipient_id AS "recipientId",
                r.subject,
                r.body,
                r.is_read AS "isRead",
                r.created_at AS "createdAt",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName",
                recipient.username AS "recipientUsername",
                recipient.first_name AS "recipientFirstName",
                recipient.last_name AS "recipientLastName"
            FROM message_replies r
            JOIN users sender on r.sender_id = sender.id
            JOIN users recipient on r.recipient_id = recipient.id
            WHERE sender.username = $1
            ORDER BY r.created_at`,
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