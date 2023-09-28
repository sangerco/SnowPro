import request from "supertest";
import { app } from "../../index";

let messageId: string;

describe("create new message", () => {
  describe("post /api/new-message", () => {
    it("should create a new message", async () => {
      const newMessageData = {
        senderId: "11",
        recipientId: "22",
        subject: "test message",
        body: "test message body",
      };
      const resp = await request(app)
        .post("/api/new-message")
        .send(newMessageData);
      messageId = resp.body.message.id;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        message: {
          id: expect.any(String),
          senderId: "11",
          recipientId: "22",
          subject: "test message",
          body: "test message body",
          isRead: false,
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("get messages", () => {
  describe("get /messages/:id", () => {
    it("should retrieve a message by id", async () => {
      const resp = await request(app).get("/messages/message-1");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        message: {
          id: "message-1",
          senderId: "11",
          senderUsername: "john_doe",
          senderFirstName: "John",
          senderLastName: "Doe",
          recipientId: "22",
          recipientUsername: "jane_smith",
          recipientFirstName: "Jane",
          recipientLastName: "Smith",
          subject: "Greetings",
          body: "Hello Jane! How are you?",
          isRead: true,
          createdAt: expect.any(String),
        },
        replies: [
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
            subject: "Re: Greetings",
            body: "Hello John! I'm glad to hear you're doing well.",
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });

  describe("get /messages/users/:username", () => {
    it("should the messages of a given user", async () => {
      const resp = await request(app).get(`/messages/users/susan_brown`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        messages: [
          {
            id: expect.any(String),
            senderId: "33",
            senderUsername: "mike_jones",
            senderFirstName: "Mike",
            senderLastName: "Jones",
            recipientId: "44",
            recipientUsername: "susan_brown",
            recipientFirstName: "Susan",
            recipientLastName: "Brown",
            subject: "Question about resorts",
            body: "Hi Susan, I have a question about resorts. Can you help?",
            isRead: false,
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });

  describe("get /messages/users/:username/sent", () => {
    it(`should get a given user's sent messages`, async () => {
      const resp = await request(app).get(`/messages/users/mike_jones/sent`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        messages: [
          {
            id: expect.any(String),
            senderId: "33",
            senderUsername: "mike_jones",
            senderFirstName: "Mike",
            senderLastName: "Jones",
            recipientId: "44",
            recipientUsername: "susan_brown",
            recipientFirstName: "Susan",
            recipientLastName: "Brown",
            subject: "Question about resorts",
            body: "Hi Susan, I have a question about resorts. Can you help?",
            isRead: false,
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });
});

describe("mark message read/unread", () => {
  describe("patch /api/messages/:id/read", () => {
    it("should mark a message as read", async () => {
      const resp = await request(app).patch(`/api/messages/${messageId}/read`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        markedAsRead: `${messageId}`,
      });
    });
  });

  describe("patch /api/messages/:id/unread", () => {
    it("should mark a message as unread", async () => {
      const resp = await request(app).patch(
        `/api/messages/${messageId}/unread`
      );
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        markedAsUnread: `${messageId}`,
      });
    });
  });
});

describe("delete message", () => {
  describe("delete /api/messages/:id", () => {
    it("should delete a message", async () => {
      const resp = await request(app).delete(`/api/messages/${messageId}`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        deleted: `${messageId}`,
      });
    });
  });
});
