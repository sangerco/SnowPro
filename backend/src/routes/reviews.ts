import { ValidatorResult, validate } from 'jsonschema';
import express, { Request, Response, NextFunction } from 'express';
import { ensureLoggedIn, checkIfUserOrAdmin } from '../middleware/auth';
import { BadRequestError } from '../expressError';
import Review from '../models/review';
import reviewUpdateSchema from '../schemas/reviewUpdate.json';
import reviewReplyNewSchema from '../schemas/reviewReplyNew.json';
import reviewReplyUpdateSchema from '../schemas/reviewReplyUpdate.json';
import ReviewReply from '../models/reviewReply';
import SkiArea from '../models/skiArea';

const router = express.Router();

interface ReplyReviewData {
    userId: string;
    reviewId: string;
    body: string;
    slug: string;
}

// update a ski area review

router.patch('/api/reviews/:id', ensureLoggedIn, checkIfUserOrAdmin,async (req: Request, res: Response, next: NextFunction) => {
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

router.get('/ski-areas/reviews', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await Review.getAllReviews();
        return res.json({ reviews });
    } catch (e) {
        next(e);
    }
});

// get reviews by ski area name

router.get('/ski-areas/:slug/reviews', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await SkiArea.fetchReviewsBySkiAreaSlug(req.params.slug);
        return res.json({ reviews });
    } catch (e) {
        next(e);
    }
});

// get review by id

router.get('/ski-areas/:slug/reviews/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewData = await Review.fetchReviewById(req.params.id);

        const getReviewReplyData: ReplyReviewData[] = await ReviewReply.fetchRepliesByReviewId(req.params.id);

        const review = {
            ...reviewData,
            replyData: getReviewReplyData
        }
        return res.json({ review });
    } catch (e) {
        next(e);
    }
});

// delete a ski area review

router.delete('/api/:slug/reviews/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Review.removeReview(req.params.id);
        return res.json({ deleted: `review ${req.params.id}` });
    } catch (e) {
        return next (e);
    }
});

// create a review reply 

router.post('/api/reviews/:id/reply', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: ValidatorResult = validate(req.body, reviewReplyNewSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }
        const { userId, reviewId, body, slug }: ReplyReviewData = req.body;
        const reply = await ReviewReply.replyToReview(userId, reviewId, body, slug);
        return res.status(201).json({ reply });
    } catch (e) {
        return next(e);
    }
});

// update a review reply

router.patch('/api/reviews/reply/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
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

// fetch a review reply by id

router.get('/ski-areas/:slug/reviews/:review_id/replies/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reply = await ReviewReply.fetchReplyId(req.params.id);
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
