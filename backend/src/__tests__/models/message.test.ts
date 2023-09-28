import Message from "../../models/message";

let messageId: string;

describe("create new message", () => {
  const newMessage = {
    senderId: "11",
    recipientId: "22",
    subject: "test subject",
    body: "test body",
  };

  it("should create a new message", async () => {
    const message = await Message.createMessage(
      newMessage.senderId,
      newMessage.recipientId,
      newMessage.subject,
      newMessage.body
    );
    messageId = message.id;
    expect(message).toEqual([
      {
        senderId: "11",
        recipientId: "22",
        subject: "test subject",
        body: "test body",
        isRead: false,
        id: expect.any(String),
        createdAt: expect.any(Date),
      },
    ]);
  });
});

describe("get messages", () => {
  it("should get messages by id", async () => {
    const message = await Message.getMessage("message-1");
    expect(message).toEqual({
      senderId: "11",
      recipientId: "22",
      subject: "Greetings",
      body: "Hello Jane! How are you?",
      isRead: true,
      senderUsername: "john_doe",
      senderFirstName: "John",
      senderLastName: "Doe",
      recipientUsername: "jane_smith",
      recipientFirstName: "Jane",
      recipientLastName: "Smith",
      id: expect.any(String),
      createdAt: expect.any(Date),
    });
  });

  it("should get messages by user", async () => {
    const messages = await Message.getUsersMessages("john_doe");
    expect(messages).toEqual([
      {
        id: expect.any(String),
        senderId: "22",
        recipientId: "11",
        subject: "Re: Greetings",
        body: "Hi John! I'm doing well, thank you.",
        createdAt: expect.any(Date),
        isRead: false,
        senderUsername: "jane_smith",
        senderFirstName: "Jane",
        senderLastName: "Smith",
        recipientUsername: "john_doe",
        recipientFirstName: "John",
        recipientLastName: "Doe",
      },
    ]);
  });

  it(`should get user's sent messages`, async () => {
    const messages = await Message.getSentMessages("john_doe");
    expect(messages).toEqual([
      {
        id: expect.any(String),
        senderId: "11",
        recipientId: "22",
        subject: "Greetings",
        body: "Hello Jane! How are you?",
        createdAt: expect.any(Date),
        senderUsername: "john_doe",
        senderFirstName: "John",
        senderLastName: "Doe",
        recipientUsername: "jane_smith",
        recipientFirstName: "Jane",
        recipientLastName: "Smith",
      },
      {
        id: expect.any(String),
        senderId: "11",
        recipientId: "22",
        subject: "test subject",
        body: "test body",
        createdAt: expect.any(Date),
        senderUsername: "john_doe",
        senderFirstName: "John",
        senderLastName: "Doe",
        recipientUsername: "jane_smith",
        recipientFirstName: "Jane",
        recipientLastName: "Smith",
      },
    ]);
  });
});

describe("mark messages read and unread", () => {
  it("should mark a message read", async () => {
    await Message.markMessageAsRead("message-4");
    const message = await Message.getMessage("message-4");
    expect(message).toEqual({
      senderId: "44",
      recipientId: "33",
      subject: "Re: Question about resorts",
      body: `Of course! I'd be happy to help.`,
      isRead: true,
      id: expect.any(String),
      createdAt: expect.any(Date),
      senderUsername: "susan_brown",
      senderFirstName: "Susan",
      senderLastName: "Brown",
      recipientUsername: "mike_jones",
      recipientFirstName: "Mike",
      recipientLastName: "Jones",
    });
  });

  it("should mark a message unread", async () => {
    await Message.markMessageAsUnread("message-4");
    const message = await Message.getMessage("message-4");
    expect(message).toEqual({
      senderId: "44",
      recipientId: "33",
      subject: "Re: Question about resorts",
      body: `Of course! I'd be happy to help.`,
      isRead: false,
      id: expect.any(String),
      createdAt: expect.any(Date),
      senderUsername: "susan_brown",
      senderFirstName: "Susan",
      senderLastName: "Brown",
      recipientUsername: "mike_jones",
      recipientFirstName: "Mike",
      recipientLastName: "Jones",
    });
  });
});

describe("delete message", () => {
  it("should delete message by id", async () => {
    await Message.removeMessage(messageId);
    const message = await Message.getMessage(messageId);
    expect(message).toBeUndefined();
  });
});
