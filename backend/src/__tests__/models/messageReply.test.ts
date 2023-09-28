import Reply from "../../models/messageReply";

let messageReplyId: string;

describe("create message reply", () => {
  it("should create a reply", async () => {
    const newReply = {
      messageId: "message-1",
      senderId: "22",
      recipientId: "11",
      subject: "test subject",
      body: "test body",
    };

    const reply = await Reply.createReply(
      newReply.messageId,
      newReply.senderId,
      newReply.recipientId,
      newReply.subject,
      newReply.body
    );
    messageReplyId = reply.id;
    expect(reply).toEqual({
      id: expect.any(String),
      messageId: "message-1",
      senderId: "22",
      recipientId: "11",
      subject: "test subject",
      body: "test body",
      isRead: false,
      createdAt: expect.any(Date),
    });
  });
});

describe("get replies", () => {
  it("retrieves a reply by reply id", async () => {
    const reply = await Reply.getReplyById("message-reply-1");
    expect(reply).toEqual({
      id: "message-reply-1",
      messageId: "message-1",
      senderId: "22",
      recipientId: "11",
      subject: "Re: Greetings",
      body: `Hello John! I'm glad to hear you're doing well.`,
      createdAt: expect.any(Date),
      isRead: true,
      senderUsername: "jane_smith",
      senderFirstName: "Jane",
      senderLastName: "Smith",
      recipientUsername: "john_doe",
      recipientFirstName: "John",
      recipientLastName: "Doe",
    });
  });

  it("should retrieve replies by message id", async () => {
    const replies = await Reply.getRepliesByMessageId("message-1");
    expect(replies).toEqual([
      {
        id: expect.any(String),
        messageId: "message-1",
        senderId: "22",
        recipientId: "11",
        subject: "Re: Greetings",
        body: `Hello John! I'm glad to hear you're doing well.`,
        createdAt: expect.any(Date),
        senderUsername: "jane_smith",
        senderFirstName: "Jane",
        senderLastName: "Smith",
        recipientUsername: "john_doe",
        recipientFirstName: "John",
        recipientLastName: "Doe",
      },
      {
        id: expect.any(String),
        messageId: "message-1",
        senderId: "22",
        recipientId: "11",
        subject: "test subject",
        body: `test body`,
        createdAt: expect.any(Date),
        senderUsername: "jane_smith",
        senderFirstName: "Jane",
        senderLastName: "Smith",
        recipientUsername: "john_doe",
        recipientFirstName: "John",
        recipientLastName: "Doe",
      },
    ]);
  });
  it("should retrieve replies by username", async () => {
    const replies = await Reply.getReceivedRepliesByUsername("mike_jones");
    expect(replies).toEqual([
      {
        id: expect.any(String),
        messageId: expect.any(String),
        senderId: "44",
        recipientId: "33",
        subject: "Re: Question about resorts",
        body: "Of course! What do you need help with?",
        createdAt: expect.any(Date),
        senderUsername: "susan_brown",
        senderFirstName: "Susan",
        senderLastName: "Brown",
        recipientUsername: "mike_jones",
        recipientFirstName: "Mike",
        recipientLastName: "Jones",
      },
    ]);
  });
  it("should retrieve sent replies by username", async () => {
    const replies = await Reply.getSentRepliesByUsername("susan_brown");
    expect(replies).toEqual([
      {
        id: expect.any(String),
        messageId: expect.any(String),
        senderId: "44",
        recipientId: "33",
        subject: "Re: Question about resorts",
        body: "Of course! What do you need help with?",
        createdAt: expect.any(Date),
        senderUsername: "susan_brown",
        senderFirstName: "Susan",
        senderLastName: "Brown",
        recipientUsername: "mike_jones",
        recipientFirstName: "Mike",
        recipientLastName: "Jones",
      },
    ]);
  });
});

describe("mark replies read/unread", () => {
  it("should mark replies read", async () => {
    await Reply.markMessageReplyAsRead("message-reply-3");
    const reply = await Reply.getReplyById("message-reply-3");
    expect(reply.isRead).toEqual(true);
  });
  it("should mark replies unread", async () => {
    await Reply.markMessageReplyAsUnread("message-reply-3");
    const reply = await Reply.getReplyById("message-reply-3");
    expect(reply.isRead).toEqual(false);
  });
});

describe("delete reply", () => {
  it("should delete a reply", async () => {
    await Reply.deleteReply(messageReplyId);
    const reply = await Reply.getReplyById(messageReplyId);
    expect(reply).toBeUndefined();
  });
});
