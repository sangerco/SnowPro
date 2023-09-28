import request from "supertest";
import { app } from "../../index";

let messageReplyId: string;

describe("create a message reply", () => {
  describe("post /api/messages/:id/reply", () => {
    it("should create a reply", async () => {
      const messageId = "message-1";
      const newMessageReplyData = {
        messageId: messageId,
        senderId: "22",
        recipientId: "11",
        subject: "test message reply",
        body: "test message reply body",
      };
      const resp = await request(app)
        .post(`/api/messages/${messageId}/reply`)
        .send(newMessageReplyData);
      messageReplyId = resp.body.reply.id;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        reply: {
          id: expect.any(String),
          messageId: "message-1",
          senderId: "22",
          recipientId: "11",
          subject: "test message reply",
          body: "test message reply body",
          createdAt: expect.any(String),
          isRead: false,
        },
      });
    });
  });
});

describe("get message replies", () => {
  describe("get /messages/replies/:id", () => {
    it("should fetch message replies by reply id", async () => {
      const resp = await request(app).get("/messages/replies/message-reply-1");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        reply: {
          id: "message-reply-1",
          messageId: "message-1",
          senderId: "22",
          senderUsername: "jane_smith",
          senderFirstName: "Jane",
          senderLastName: "Smith",
          recipientId: "11",
          recipientUsername: "john_doe",
          recipientFirstName: "John",
          recipientLastName: "Doe",
          subject: "Re: Greetings",
          body: "Hello John! I'm glad to hear you're doing well.",
          isRead: true,
          createdAt: expect.any(String),
        },
      });
    });
  });

  describe("get /messages/:id/replies", () => {
    it("should return all replies to a message", async () => {
      const resp = await request(app).get(`/messages/message-1/replies`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        replies: [
          {
            id: "message-reply-1",
            messageId: "message-1",
            senderId: "22",
            senderUsername: "jane_smith",
            senderFirstName: "Jane",
            senderLastName: "Smith",
            recipientId: "11",
            recipientUsername: "john_doe",
            recipientFirstName: "John",
            recipientLastName: "Doe",
            subject: "Re: Greetings",
            body: "Hello John! I'm glad to hear you're doing well.",
            createdAt: expect.any(String),
          },
          {
            id: expect.any(String),
            messageId: "message-1",
            senderId: "22",
            senderUsername: "jane_smith",
            senderFirstName: "Jane",
            senderLastName: "Smith",
            recipientId: "11",
            recipientUsername: "john_doe",
            recipientFirstName: "John",
            recipientLastName: "Doe",
            subject: "test message reply",
            body: "test message reply body",
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });
});

describe("mark replies read/unread", () => {
  describe("patch /api/messages/replies/:id/read", () => {
    it("should mark a message read", async () => {
      const resp = await request(app).patch(
        `/api/messages/replies/${messageReplyId}/read`
      );
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        markedAsRead: `${messageReplyId}`,
      });
    });
  });

  describe("patch /api/messages/replies/:id/unread", () => {
    it("should mark a message read", async () => {
      const resp = await request(app).patch(
        `/api/messages/replies/${messageReplyId}/unread`
      );
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        markedAsUnread: `${messageReplyId}`,
      });
    });
  });
});

describe("delete message reply", () => {
  describe('delete "/api/messages/replies/:id"', () => {
    it("should delete the message reply", async () => {
      const resp = await request(app).delete(
        `/api/messages/replies/${messageReplyId}`
      );
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({ deleted: `${messageReplyId}` });
    });
  });
});
