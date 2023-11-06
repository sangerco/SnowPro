import db from "../db";
import { NotFoundError } from "../expressError";
import { v4 as uuidv4 } from "uuid";

interface MessageData {
  id: string;
  senderId: string;
  subject: string;
  body: string;
  createdId: Date;
  isRead: boolean;
  senderUsername: string;
  senderFirstName: string;
  senderLastName: string;
  recipients: {
    recipientId: string;
    recipientUsername: string;
    recipientFirstName: string;
    recipientLastName: string;
  }[];
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
    recipientIds: string[],
    subject: string,
    body: string
  ): Promise<MessageData> {
    const createdAt = new Date();
    const id = uuidv4();

    const result = await db.query(
      `
            INSERT INTO messages
            (   id,
                sender_id,
                subject,
                body, 
                created_at,
                is_read)
            VALUES ($1, $2, $3, $4, $5, $6, false)
            RETURNING
                id,
                sender_id AS "senderId",
                subject,
                body,
                is_read AS "isRead",
                created_at AS "createdAt"`,
      [id, senderId, subject, body, createdAt]
    );

    for (let recipientId of recipientIds) {
      await db.query(
        `
            INSERT INTO messages_recipients
              (message_id, recipient_id)
            VALUES ($1, $2)`,
        [id, recipientId]
      );
    }

    const message = result.rows[0];

    return message;
  }

  static async getMessage(id: string): Promise<MessageData> {
    const messageData = await db.query(
      `SELECT 
                m.id,
                m.sender_id AS "senderId",
                m.subject,
                m.body,
                m.created_at AS "createdAt",
                m.is_read AS "isRead",
                sender.username AS "senderUsername",
                sender.first_name AS "senderFirstName",
                sender.last_name AS "senderLastName"            
            FROM messages m
            JOIN users sender ON m.sender_id = sender.id
            WHERE m.id = $1
            ORDER BY created_at`,
      [id]
    );

    const message = messageData.rows[0];

    const recipientData = await db.query(
      `
      SELECT 
            u.id AS "recipientId",
            u.username AS "recipientUsername",
            u.first_name AS "recipientFirstName",
            u.last_name AS "recipientLastName"
        FROM messages_recipients mr
        JOIN users u ON mr.recipient_id = u.id
        WHERE mr.message_id = $1
            `,
      [id]
    );
    const recipients = recipientData.rows;

    const messageWithRecipients = {
      ...message,
      recipients: recipients,
    };

    return messageWithRecipients;
  }

  static async getUsersMessages(username: string): Promise<UserWithMessages[]> {
    const receivedMessages = await db.query(
      `
      SELECT mr.message_id
        FROM messages_recipients mr
        JOIN users u ON u.id = mr.recipient_id
        WHERE u.username = $1`,
      [username]
    );

    const receivedMessageIds = receivedMessages.rows.map(
      (row) => row.message_id
    );

    const receivedMessagesWithRecipients = [];

    for (let id of receivedMessageIds) {
      const messageQuery = await db.query(
        `SELECT 
                  m.id,
                  m.sender_id AS "senderId",
                  m.subject,
                  m.body,
                  m.created_at AS "createdAt",
                  m.is_read AS "isRead",
                  sender.username AS "senderUsername",
                  sender.first_name AS "senderFirstName",
                  sender.last_name AS "senderLastName"            
              FROM messages m
              JOIN users sender ON m.sender_id = sender.id
              WHERE m.id = $1
              ORDER BY created_at`,
        [id]
      );

      const message = messageQuery.rows[0];

      const recipientData = await db.query(
        `
        SELECT 
              u.id AS "recipientId",
              u.username AS "recipientUsername",
              u.first_name AS "recipientFirstName",
              u.last_name AS "recipientLastName"
          FROM messages_recipients mr
          JOIN users u ON mr.recipient_id = u.id
          WHERE mr.message_id = $1
              `,
        [id]
      );
      const recipients = recipientData.rows;

      const messageWithRecipients = {
        ...message,
        recipients: recipients,
      };

      receivedMessagesWithRecipients.push(messageWithRecipients);
    }

    return receivedMessagesWithRecipients;
  }

  static async getSentMessages(username: string): Promise<UserWithMessages[]> {
    const sentMessagesResults = await db.query(
      `
      SELECT m.id
        FROM messages.m
        JOIN users u ON u.id = m.sender_id
        WHERE u.username = $1`,
      [username]
    );

    const sentMessageIds = sentMessagesResults.rows.map((row) => row.id);

    const sentMessagesWithRecipients = [];

    for (let id of sentMessageIds) {
      const messageQuery = await db.query(
        `SELECT 
                  m.id,
                  m.sender_id AS "senderId",
                  m.subject,
                  m.body,
                  m.created_at AS "createdAt",
                  m.is_read AS "isRead",
                  sender.username AS "senderUsername",
                  sender.first_name AS "senderFirstName",
                  sender.last_name AS "senderLastName"            
              FROM messages m
              JOIN users sender ON m.sender_id = sender.id
              WHERE m.id = $1
              ORDER BY created_at`,
        [id]
      );

      const message = messageQuery.rows[0];

      const recipientData = await db.query(
        `
        SELECT 
              u.id AS "recipientId",
              u.username AS "recipientUsername",
              u.first_name AS "recipientFirstName",
              u.last_name AS "recipientLastName"
          FROM messages_recipients mr
          JOIN users u ON mr.recipient_id = u.id
          WHERE mr.message_id = $1
              `,
        [id]
      );

      const recipients = recipientData.rows;

      const messageWithRecipients = {
        ...message,
        recipients: recipients,
      };

      sentMessagesWithRecipients.push(messageWithRecipients);
    }

    return sentMessagesWithRecipients;
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
