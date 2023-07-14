import { ValidatorResult, validate } from 'jsonschema';
import express, { Request, Response, NextFunction } from 'express';
import { ensureLoggedIn, checkIfUserOrAdmin } from '../middleware/auth';
import { BadRequestError } from '../expressError';
import Review from '../models/review';
import reviewUpdateSchema from '../schemas/reviewUpdate.json';
import reviewReplyNewSchema from '../schemas/reviewReplyNew.json';
import reviewReplyUpdateSchema from '../schemas/reviewReplyUpdate.json';
import ReviewReply from '../models/reviewReply';

const router = express.Router();

interface ReplyReviewData {
    userId: string;
    reviewId: string;
    body: string;
}

// update a ski area review

router.patch('/reviews/:id', ensureLoggedIn, checkIfUserOrAdmin,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: ValidatorResult = validate(req.body, reviewUpdateSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);            
        }
        const review = await Review.updateReview(req.params.id, req.body);
        return res.json({ review });
    } catch (e) {
        return next(e);
    }
});

// delete a ski area review

router.delete('/api/reviews/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Review.removeReview(req.params.id);
        return res.json({ deleted: `review ${req.params.id}` });
    } catch (e) {
        return next (e);
    }
});

// create a review reply 

router.post('/reviews/:id/reply', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: ValidatorResult = validate(req.body, reviewReplyNewSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }
        const { userId, reviewId, body }: ReplyReviewData = req.body;
        const reply = await ReviewReply.replyToReview(userId, reviewId, body);
        return res.status(201).json({ reply });
    } catch (e) {
        return next(e);
    }
});

// update a review reply

router.patch('/reviews/reply/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: ValidatorResult = validate(req.body, reviewReplyUpdateSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }

        const reply = await ReviewReply.replyToReviewUpdate(req.params.id, req.body);
        return res.json({ reply });
    } catch (e) {
        return next(e);
    }
});

// delete a review reply

router.delete('/api/reviews/reply/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await ReviewReply.removeReply(req.params.id);
        res.json({ deleted: `reply: ${req.params.id}` });
    } catch (e) {
        return next(e);
    }
});

export default router;
