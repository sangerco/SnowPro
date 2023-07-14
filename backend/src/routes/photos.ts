import * as jsonschema from 'jsonschema';
import express, { Request, Response, NextFunction } from 'express';
import { ensureLoggedIn, checkIfUserOrAdmin } from '../middleware/auth';
import { BadRequestError } from '../expressError';
import Photo from '../models/photo';
import photoNewSchema from '../schemas/photoLinkNew.json';

const router = express.Router();

interface PhotoData {
    userId: string;
    link: string;
    about: string;
    tagIds: string[];
}

router.post('/api/photos', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: jsonschema.ValidatorResult = jsonschema.validate(req.body, photoNewSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }
        const { userId, link, about, tagIds }: PhotoData = req.body;
        const photo = await Photo.createPhoto(userId, link, about, tagIds);
        return res.status(201).json({ photo });
    } catch (e) {
        return next(e);
    }
});

router.get('/photo/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const photo = await Photo.getPhoto(req.params.id);
        return res.json({ photo });
    } catch (e) {
        return next(e);
    }
});

router.delete('/api/photo/:id', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Photo.removePhoto(req.params.id);
        return res.json({ deleted: `Photo removed ${req.params.id}` })
    } catch (e) {
        return next(e);
    }

});

export default router;

