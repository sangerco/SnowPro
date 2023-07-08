import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface MessageData {
    id: string;
    senderId: string;
    recipientId: string;
    body: string;
}

class Message {
    static async createMessage(senderId: string, recipientId:string, body: string): Promise<MessageData> {
        const id = uuidv4();

        const result = await db.query(`
            INSERT INTO messages
            (   id,
                sender_id,
                recipient_id,
                body)
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                sender_id AS "senderId",
                recipient_id AS "recipientId",
                body`,
            [   id,
                senderId,
                recipientId,
                body
            ]
        );

        const message = result.rows[0];

        return message;
    };
    
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
