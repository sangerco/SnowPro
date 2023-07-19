import * as jsonschema from 'jsonschema';
import express, { Request, Response, NextFunction } from 'express';
import { ensureLoggedIn, checkIfAdmin, checkIfUserOrAdmin } from '../middleware/auth';
import { BadRequestError } from '../expressError';
import User from '../models/user';
import { createToken } from '../helpers/tokens';
import userRegisterSchema from '../schemas/userRegister.json';
import userUpdateSchema from '../schemas/userUpdate.json';
import FavMountain from '../models/favMountain';

const router = express.Router();

interface UserRegisterData {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string
}

// create a new user

router.post('/api/new-user', ensureLoggedIn, checkIfAdmin, async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const validator: jsonschema.ValidatorResult = jsonschema.validate(req.body, userRegisterSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }
        const { username, password, firstName, lastName, email }: UserRegisterData = req.body;
        const user = await User.register(username, password, firstName, lastName, email);
        const token = createToken(user);
        return res.status(201).json({ user, token })
    }  catch (e) {
        return next(e)
    }
});

// get a list of all users

router.get('/users/all-users', ensureLoggedIn, checkIfAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAllUsers();
        return res.json({ users });
    } catch (e) {
        return next(e);
    };
});

// return a single user's profile

router.get('/users/:username', ensureLoggedIn, checkIfUserOrAdmin,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.getUser(req.params.username);
        return res.json({ user });
    } catch (e) {
        return next(e);
    };
});

// update a user's profile

router.patch('/:username', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator: jsonschema.ValidatorResult = jsonschema.validate(req.body, userUpdateSchema);
        if(!validator.valid) {
            const errors: string | string[] = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }

        const user = await User.updateUser(req.params.username, req.body);
        return res.json({ user });
    } catch (e) {
        return next(e);
    };
});

// delete a user

router.delete('/api/:username', ensureLoggedIn, checkIfUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (e) {
        return next(e);
    };
});

export default router;