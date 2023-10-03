import { store } from "../../../redux/store";
import {
  createMessageReply,
  deleteMessageReply,
  markMessageReplyAsRead,
  markMessageReplyAsUnread,
  fetchMessageReply,
  fetchMessageRepliesByMessageId,
  MessageReplyData,
} from "../../../redux/slices/messageReplySlice";
import { createUser } from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";
import {
  createMessage,
  deleteMessage,
} from "../../../redux/slices/messageSlice";

const testUser = {
  username: "testuser",
  password: "password",
  firstName: "Test",
  lastName: "User",
  email: "test@user.com",
};

const testUser2 = {
  username: "testuser2",
  password: "password",
  firstName: "Test",
  lastName: "User2",
  email: "test@user2.com",
};

let testUserId: string | undefined;
let testUser2Id: string | undefined;

let messageId: string | undefined;

beforeAll(async () => {
  await store.dispatch(createUser(testUser));

  testUserId = store.getState().auth.data!.id;

  await store.dispatch(createUser(testUser2));

  testUser2Id = store.getState().auth.data!.id;

  const messageData = {
    senderId: testUserId!,
    recipientId: testUser2Id!,
    subject: "test message",
    body: "test message body",
  };

  await store.dispatch(createMessage(messageData));

  messageId = store.getState().messages.message!.id;
});

afterAll(async () => {
  await store.dispatch(deleteMessage(messageId!));
  await store.dispatch(deleteUser("testuser"));
  await store.dispatch(deleteUser("testuser2"));
});

// @ts-ignore
let messageReply;

describe("test message reply slice", () => {
  it("should create a message reply", async () => {
    const messageReplyData = {
      messageId: messageId!,
      senderId: testUserId!,
      recipientId: testUser2Id!,
      subject: "test message reply",
      body: "test message reply body",
    };
    await store.dispatch(createMessageReply(messageReplyData));
    messageReply = store.getState().messageReplies.messageReply;
  });
  it("should fetch a message reply by id", async () => {
    // @ts-ignore
    await store.dispatch(fetchMessageReply(messageReply.id));
    const messageReplyState = store.getState().messageReplies.messageReply;
    expect(messageReplyState).toEqual({
      id: expect.any(String),
      messageId: messageId,
      senderId: testUserId,
      senderUsername: "testuser",
      senderFirstName: "Test",
      senderLastName: "User",
      recipientId: testUser2Id,
      recipientUsername: "testuser2",
      recipientFirstName: "Test",
      recipientLastName: "User2",
      subject: "test message reply",
      body: "test message reply body",
      isRead: false,
      createdAt: expect.any(String),
    });
  });
  it("should fetch message replies by message id", async () => {
    await store.dispatch(fetchMessageRepliesByMessageId(messageId!));
    const messageReplyState = store.getState().messageReplies.messageReply;
    expect(messageReplyState).toEqual([
      {
        id: expect.any(String),
        messageId: messageId,
        senderId: testUserId,
        senderUsername: "testuser",
        senderFirstName: "Test",
        senderLastName: "User",
        recipientId: testUser2Id,
        recipientUsername: "testuser2",
        recipientFirstName: "Test",
        recipientLastName: "User2",
        subject: "test message reply",
        body: "test message reply body",
        isRead: false,
        createdAt: expect.any(String),
      },
    ]);
  });
  it("should mark a message reply as read", async () => {
    // @ts-ignore
    await store.dispatch(markMessageReplyAsRead(messageReply.id));
    // @ts-ignore
    await store.dispatch(fetchMessageReply(messageReply.id));
    let messageReplyState = store.getState().messageReplies.messageReply;
    expect(messageReplyState).toEqual({
      id: expect.any(String),
      messageId: messageId,
      senderId: testUserId,
      senderUsername: "testuser",
      senderFirstName: "Test",
      senderLastName: "User",
      recipientId: testUser2Id,
      recipientUsername: "testuser2",
      recipientFirstName: "Test",
      recipientLastName: "User2",
      subject: "test message reply",
      body: "test message reply body",
      isRead: true,
      createdAt: expect.any(String),
    });
  });
  it("should mark a message reply as unread", async () => {
    // @ts-ignore
    await store.dispatch(markMessageReplyAsUnread(messageReply.id));
    // @ts-ignore
    await store.dispatch(fetchMessageReply(messageReply.id));
    let messageReplyState = store.getState().messageReplies.messageReply;
    expect(messageReplyState).toEqual({
      id: expect.any(String),
      messageId: messageId,
      senderId: testUserId,
      senderUsername: "testuser",
      senderFirstName: "Test",
      senderLastName: "User",
      recipientId: testUser2Id,
      recipientUsername: "testuser2",
      recipientFirstName: "Test",
      recipientLastName: "User2",
      subject: "test message reply",
      body: "test message reply body",
      isRead: false,
      createdAt: expect.any(String),
    });
  });
  it("should delete a message reply", async () => {
    // @ts-ignore
    await store.dispatch(deleteMessageReply(messageReply.id));
    let messageReplyState = store.getState().messageReplies.messageReply;
    expect(messageReplyState).toBeNull();
  });
});
