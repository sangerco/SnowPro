import * as jsonschema from 'jsonschema';
import express, { Request, Response, NextFunction } from 'express';
import { ensureLoggedIn, checkIfAdmin, checkIfUserOrAdmin } from '../middleware/auth';
import { BadRequestError } from '../expressError';
import Message from '../models/message';
import messageNewSchema from '../schemas/messageNew.json';

const router = express.Router();

interface MessageData {
    senderId: string;
    recipientId: string;
    body: string;
};

// create a new message

router.post('/new-message', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: jsonschema.ValidatorResult = jsonschema.validate(req.body, messageNewSchema);
        if (!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);            
        }
        const { senderId, recipientId, body }: MessageData = req.body;
        const message = await Message.createMessage(senderId, recipientId, body);
        return res.status(201).json({ message })
    } catch (e) {
        return next(e);
    };
});

// get message

router.get('/messages/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await Message.getMessage(req.params.id);
        return res.json({ message });
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

// delete a message

router.delete('/messages/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await Message.removeMessage(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (e) {
        return next(e);
    }
});

export default router;