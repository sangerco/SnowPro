import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface MessageData {
    id: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
}

export interface UsernameWithId {
    id: string;
    username: string;
}

interface UserWithMessages extends MessageData {
    usernameWithId: UsernameWithId;
}

class Message {
    static async createMessage(senderId: string, recipientId:string, subject: string, body: string): Promise<MessageData> {
        const id = uuidv4();

        const result = await db.query(`
            INSERT INTO messages
            (   id,
                sender_id,
                recipient_id,
                subject,
                body)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                id,
                sender_id AS "senderId",
                recipient_id AS "recipientId",
                subject,
                body`,
            [   id,
                senderId,
                recipientId,
                subject,
                body
            ]
        );

        const message = result.rows[0];

        return message;
    };

    static async getMessage(id: string): Promise<MessageData> {
        const result = await db.query(
            `SELECT FROM messages
                WHERE id = $1
                RETURNING 
                    sender_id AS "senderId",
                    recipient_id AS "recipientId",
                    subject,
                    body`,
                [id]
        );

        const message = result.rows[0];

        return message;
    }

    static async getUsersMessages(username: string): Promise<UserWithMessages[]> {
        const result = await db.query(
            `SELECT 
                u.username, 
                u.id, 
                m.id,
                m.sender_id AS "senderId",
                m.recipient_id AS "recipientId",
                m.subject,
                m.body
                FROM users u
                JOIN messages m ON u.id = m.recipient_id
                WHERE u.username = $1`,
                [username]
        );

        return result.rows;
    }

    static async getSentMessages(username: string): Promise<UserWithMessages[]> {
        const result = await db.query(
            `SELECT 
                u.username, 
                u.id, 
                m.id,
                m.sender_id AS "senderId",
                m.recipient_id AS "recipientId",
                m.subject,
                m.body
                FROM users u
                JOIN messages m ON u.id = m.sender_id
                WHERE u.username = $1`,
                [username]
        );

        return result.rows;
    }
    
    static async removeMessage(id: string): Promise<void> {
        const result = await db.query(
            `DELETE FROM messages
                WHERE id = $1
                RETURNING id`,
                [id]
        );
        const message = result.rows[0];

        if (!message) throw new NotFoundError('Message does not exist!');
    }
}

export default Message;