import { store } from "../../../redux/store";
import {
  createMessage,
  fetchMessage,
  fetchSentMessages,
  fetchUserMessages,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
} from "../../../redux/slices/messageSlice";
import { createUser } from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";

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
  email: "test2@user.com",
};

let testUserId: string | undefined;
let testUser2Id: string | undefined;

beforeAll(async () => {
  await store.dispatch(createUser(testUser));
  testUserId = store.getState().auth.data!.id;
  await store.dispatch(createUser(testUser2));
  testUser2Id = store.getState().auth.data!.id;
});

afterAll(async () => {
  await store.dispatch(deleteUser(testUser.username));
  await store.dispatch(deleteUser(testUser2.username));
});

describe("test message slice", () => {
  let messageId: string;

  it("should create a message", async () => {
    const newMessageData = {
      senderId: testUserId!,
      recipientId: testUser2Id!,
      subject: "test message",
      body: "test message body",
    };
    await store.dispatch(createMessage(newMessageData));
    const message = store.getState().messages.message;
    messageId = message!.id;
    expect(message).toEqual({
      id: expect.any(String),
      senderId: testUserId,
      recipientId: testUser2Id,
      subject: "test message",
      body: "test message body",
      isRead: false,
      createdAt: expect.any(String),
    });
  });
  it("should fetch a message by id", async () => {
    await store.dispatch(fetchMessage(messageId));
    const message = store.getState().messages.message;
    expect(message).toEqual({
      id: messageId,
      senderId: testUserId,
      senderUsername: "testuser",
      senderFirstName: "Test",
      senderLastName: "User",
      recipientId: testUser2Id,
      recipientUsername: "testuser2",
      recipientFirstName: "Test",
      recipientLastName: "User2",
      subject: "test message",
      body: "test message body",
      isRead: false,
      createdAt: expect.any(String),
      replies: [],
    });
  });
  it("should retrieve messages by username", async () => {
    await store.dispatch(fetchUserMessages("testuser2"));
    const messages = store.getState().messages.messages;
    expect(messages).toEqual([
      {
        id: messageId,
        senderId: testUserId,
        senderUsername: "testuser",
        senderFirstName: "Test",
        senderLastName: "User",
        recipientId: testUser2Id,
        recipientUsername: "testuser2",
        recipientFirstName: "Test",
        recipientLastName: "User2",
        subject: "test message",
        body: "test message body",
        isRead: false,
        createdAt: expect.any(String),
      },
    ]);
  });
  it(`should retrieve a user's sent messages`, async () => {
    await store.dispatch(fetchSentMessages("testuser"));
    const messages = store.getState().messages.messages;
    expect(messages).toEqual([
      {
        id: messageId,
        senderId: testUserId,
        senderUsername: "testuser",
        senderFirstName: "Test",
        senderLastName: "User",
        recipientId: testUser2Id,
        recipientUsername: "testuser2",
        recipientFirstName: "Test",
        recipientLastName: "User2",
        subject: "test message",
        body: "test message body",
        isRead: false,
        createdAt: expect.any(String),
      },
    ]);
  });
  it("should mark a message read", async () => {
    await store.dispatch(markMessageAsRead(messageId));
    await store.dispatch(fetchMessage(messageId));
    const message = store.getState().messages.message;
    expect(message).toEqual({
      id: messageId,
      senderId: testUserId,
      senderUsername: "testuser",
      senderFirstName: "Test",
      senderLastName: "User",
      recipientId: testUser2Id,
      recipientUsername: "testuser2",
      recipientFirstName: "Test",
      recipientLastName: "User2",
      subject: "test message",
      body: "test message body",
      isRead: true,
      createdAt: expect.any(String),
      replies: [],
    });
  });
  it("should mark a message unread", async () => {
    await store.dispatch(markMessageAsUnread(messageId));
    await store.dispatch(fetchMessage(messageId));
    const message = store.getState().messages.message;
    expect(message).toEqual({
      id: messageId,
      senderId: testUserId,
      senderUsername: "testuser",
      senderFirstName: "Test",
      senderLastName: "User",
      recipientId: testUser2Id,
      recipientUsername: "testuser2",
      recipientFirstName: "Test",
      recipientLastName: "User2",
      subject: "test message",
      body: "test message body",
      isRead: false,
      createdAt: expect.any(String),
      replies: [],
    });
  });
  it("should delete a message", async () => {
    await store.dispatch(deleteMessage(messageId));
    const messageState = store.getState().messages.message;
    expect(messageState).toBeNull();
  });
});
