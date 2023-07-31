import * as jsonschema from 'jsonschema';
import express, { Request, Response, NextFunction } from 'express';
import { ensureLoggedIn, checkIfUserOrAdmin } from '../middleware/auth';
import { BadRequestError } from '../expressError';
import Reply from '../models/messageReply';
import replyNewSchema from '../schemas/messageReply.json';

const router = express.Router();

interface ReplyData {
    messageId: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
}

router.post('/api/messages/:id/reply', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: jsonschema.ValidatorResult = jsonschema.validate(req.body, replyNewSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors)
        }
        const { messageId, senderId, recipientId, subject, body }: ReplyData = req.body;
        const reply = await Reply.createReply(messageId, senderId, recipientId, subject, body);
        return res.status(201).json({ reply });
    } catch (e) {
        return next (e);
    };
});

router.get('/messages/replies/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.id);
        const reply = await Reply.getReplyById(req.params.id);
        return res.json({ reply });
    } catch (e) {
        return next(e);
    };
});

router.get('/messages/:id/replies', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const replies = await Reply.getRepliesByMessageId(req.params.id);
        return res.json({ replies });
    } catch (e) {
        return next(e);
    };
});

router.delete('/api/messages/:id/replies/:replyId', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Reply.deleteReply(req.params.replyId);
        return res.json({ deleted: req.params.replyId });
    } catch (e) {
        return next(e);
    };
});

