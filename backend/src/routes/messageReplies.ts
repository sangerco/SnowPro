import * as jsonschema from "jsonschema";
import express, { Request, Response, NextFunction } from "express";
import { ensureLoggedIn, checkIfUserOrAdmin } from "../middleware/auth";
import { BadRequestError } from "../expressError";
import Reply from "../models/messageReply";
import replyNewSchema from "../schemas/messageReply.json";

const router = express.Router();

interface ReplyData {
  messageId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
}

// create new message reply

router.post(
  "/api/messages/:id/reply",
  ensureLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        replyNewSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errors);
      }
      const { messageId, senderId, recipientId, subject, body }: ReplyData =
        req.body;
      const reply = await Reply.createReply(
        messageId,
        senderId,
        recipientId,
        subject,
        body
      );
      return res.status(201).json({ reply });
    } catch (e) {
      return next(e);
    }
  }
);

// get meassage reply by id

router.get(
  "/messages/replies/:id",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params.id);
      const reply = await Reply.getReplyById(req.params.id);
      return res.status(200).json({ reply });
    } catch (e) {
      return next(e);
    }
  }
);

// get all replies to a message

router.get(
  "/messages/:id/replies",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const replies = await Reply.getRepliesByMessageId(req.params.id);
      return res.status(200).json({ replies });
    } catch (e) {
      return next(e);
    }
  }
);

// mark a reply as read

router.patch(
  "/api/messages/replies/:id/read",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Reply.markMessageReplyAsRead(req.params.id);
      return res.status(200).json({ markedAsRead: req.params.id });
    } catch (e) {
      next(e);
    }
  }
);

// mark a reply as unread

router.patch(
  "/api/messages/replies/:id/unread",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Reply.markMessageReplyAsUnread(req.params.id);
      return res.status(200).json({ markedAsUnread: req.params.id });
    } catch (e) {
      next(e);
    }
  }
);

// delete reply

router.delete(
  "/api/messages/replies/:id",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Reply.deleteReply(req.params.id);
      return res.status(200).json({ deleted: req.params.id });
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
