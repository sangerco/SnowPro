import db from "../db";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface MessageData {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  createdId: Date;
  isRead: boolean;
  senderUsername: string;
  senderFirstName: string;
  senderLastName: string;
  recipientUsername: string;
  recipientFirstName: string;
  recipientLastName: string;
}

export interface UsernameWithId {
  id: string;
  username: string;
}

interface UserWithMessages extends MessageData {
  usernameWithId: UsernameWithId;
}

class Message {
  static async createMessage(
    senderId: string,
    recipientId: string,
    subject: string,
    body: string
  ): Promise<MessageData> {
    const id = uuidv4();
    const createdAt = new Date();

    const result = await db.query(
      `
            INSERT INTO messages
            (   id,
                sender_id,
                recipient_id,
                subject,
                body, 
                created_at,
                is_read)
            VALUES ($1, $2, $3, $4, $5, $6, false)
            RETURNING
                id,
                sender_id AS "senderId",
                recipient_id AS "recipientId",
                subject,
                body,
                is_read AS "isRead",
                created_at AS "createdAt"`,
      [id, senderId, recipientId, subject, body, createdAt]
    );

    const message = result.rows[0];

    return message;
  }

  static async getMessage(id: string): Promise<MessageData> {
    const result = await db.query(
      `SELECT 
                m.id,
                m.sender_id AS "senderId",
                m.recipient_id AS "recipientId",
                m.subject,
                m.body,
                m.created_at AS "createdAt",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName",
                recipient.username AS "recipientUsername",
                recipient.first_name AS "recipientFirstName",
                recipient.last_name AS "recipientLastName"              
            FROM messages m
            JOIN users sender ON m.sender_id = sender.id
            JOIN users recipient ON m.recipient_id = recipient.id
            WHERE m.id = $1
            ORDER BY created_at`,
      [id]
    );

    const message = result.rows[0];

    return message;
  }

  static async getUsersMessages(username: string): Promise<UserWithMessages[]> {
    const result = await db.query(
      `SELECT 
                m.id,
                m.sender_id AS "senderId",
                m.recipient_id AS "recipientId",
                m.subject,
                m.body,
                m.created_at AS "createdAt",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName",
                recipient.username AS "recipientUsername",
                recipient.first_name AS "recipientFirstName",
                recipient.last_name AS "recipientLastName"              
            FROM messages m
            JOIN users sender ON m.sender_id = sender.id
            JOIN users recipient ON m.recipient_id = recipient.id
            WHERE recipient.username = $1
            ORDER BY m.created_at`,
      [username]
    );

    return result.rows;
  }

  static async getSentMessages(username: string): Promise<UserWithMessages[]> {
    const result = await db.query(
      `SELECT 
                m.id,
                m.sender_id AS "senderId",
                m.recipient_id AS "recipientId",
                m.subject,
                m.body,
                m.created_at AS "createdAt",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName",
                recipient.username AS "recipientUsername",
                recipient.first_name AS "recipientFirstName",
                recipient.last_name AS "recipientLastName"              
            FROM messages m
            JOIN users sender ON m.sender_id = sender.id
            JOIN users recipient ON m.recipient_id = recipient.id
            WHERE sender.username = $1
            ORDER BY m.created_at`,
      [username]
    );

    return result.rows;
  }

  static async markMessageAsRead(id: string): Promise<void> {
    const result = await db.query(
      `
            UPDATE messages
            SET is_read = true
            WHERE id = $1
            RETURNING id`,
      [id]
    );
    const message = result.rows[0];

    if (!message) throw new NotFoundError("Message does not exist!");
  }

  static async markMessageAsUnread(id: string): Promise<void> {
    const result = await db.query(
      `
            UPDATE messages
            SET is_read = false
            WHERE id = $1
            RETURNING id`,
      [id]
    );

    const message = result.rows[0];

    if (!message) throw new NotFoundError("Message does not exist!");
  }

  static async removeMessage(id: string): Promise<void> {
    const result = await db.query(
      `DELETE FROM messages
                WHERE id = $1
                RETURNING id`,
      [id]
    );
    const message = result.rows[0];

    if (!message) throw new NotFoundError("Message does not exist!");
  }
}

export default Message;
