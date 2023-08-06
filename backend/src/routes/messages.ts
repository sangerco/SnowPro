import * as jsonschema from 'jsonschema';
import express, { Request, Response, NextFunction } from 'express';
import { ensureLoggedIn, checkIfUserOrAdmin } from '../middleware/auth';
import { BadRequestError } from '../expressError';
import Message from '../models/message';
import MessageReply from '../models/messageReply';
import messageNewSchema from '../schemas/messageNew.json';

const router = express.Router();

interface MessageData {
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
};

// create a new message

router.post('/api/new-message', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: jsonschema.ValidatorResult = jsonschema.validate(req.body, messageNewSchema);
        if (!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);            
        }
        const { senderId, recipientId, subject, body }: MessageData = req.body;
        const message = await Message.createMessage(senderId, recipientId, subject, body);
        return res.status(201).json({ message })
    } catch (e) {
        return next(e);
    };
});

// get message

router.get('/messages/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await Message.getMessage(req.params.id);
        const replies = await MessageReply.getRepliesByMessageId(req.params.id)
        
        return res.json({ ...message, replies: replies });
    } catch (e) {
        return next(e);
    }
})

// get all of the user's received messages

router.get('/messages/:username', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await Message.getUsersMessages(req.params.username);
        return res.json({ messages });
    } catch (e) {
        return next(e);
    };
});

// get all of the user's sent messages

router.get('/messages/:username/sent', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await Message.getSentMessages(req.params.username);
        return res.json({ messages });
    } catch (e) {
        return next(e);
    };
});

// mark a message as read

router.patch('/messages/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Message.markMessageAsRead(req.params.id);
        return res.json({ markedAsRead: req.params.id });
    } catch (e) {
        next(e)
    };
});

// mark a message as unread

router.patch('/messages/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Message.markMessageAsUnread(req.params.id);
        return res.json({ markedAsUnread: req.params.id });
    } catch (e) {
        next(e)
    };
});

// delete a message

router.delete('/api/messages/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Message.removeMessage(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (e) {
        return next(e);
    }
});

export default router;