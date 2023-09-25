import * as jsonschema from "jsonschema";
import express, { Request, Response, NextFunction } from "express";
import {
  ensureLoggedIn,
  checkIfAdmin,
  checkIfUserOrAdmin,
} from "../middleware/auth";
import { BadRequestError, UnauthorizedError } from "../expressError";
import User from "../models/user";
import { createToken } from "../helpers/tokens";
import userRegisterSchema from "../schemas/userRegister.json";
import userUpdateSchema from "../schemas/userUpdate.json";
import userLoginSchema from "../schemas/userLogin.json";
import makeAdminSchema from "../schemas/makeAdminSchema.json";

const router = express.Router();

interface UserRegisterData {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface UserLoginData {
  username: string;
  password: string;
}

// create a new user

router.post(
  "/api/new-user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        userRegisterSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        // @ts-ignore
        throw new BadRequestError(errors);
      }
      const {
        username,
        password,
        first_name,
        last_name,
        email,
      }: UserRegisterData = req.body;
      const user = await User.register(
        username,
        password,
        first_name,
        last_name,
        email
      );
      const token = createToken(user);
      return res.status(201).json({ user, token });
    } catch (e) {
      return next(e);
    }
  }
);

// login a user

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        userLoginSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        // @ts-ignore
        throw new BadRequestError(errors);
      }
      const { username, password }: UserLoginData = req.body;
      const user = await User.authenticate(username, password);
      const token = createToken(user);
      return res.json({ user, token });
    } catch (e) {
      return next(e);
    }
  }
);

// get a list of all users

router.get(
  "/users/all-users",
  ensureLoggedIn,
  checkIfAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.findAllUsers();
      return res.json({ users });
    } catch (e) {
      return next(e);
    }
  }
);

// return a user's data from their token

router.get(
  "/user/my-page",
  ensureLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user)
      throw new UnauthorizedError(
        "Please log in before attempting this action."
      );

    const { userId, username } = user;
    return res.json({ userId, username });
  }
);

// return a single user's profile

router.get(
  "/users/:username",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.getUser(req.params.username);
      return res.json({ user });
    } catch (e) {
      return next(e);
    }
  }
);

// make a user an admin

router.patch(
  "/api/admin/:username",
  ensureLoggedIn,
  checkIfAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        makeAdminSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        // @ts-ignore
        throw new BadRequestError(errors);
      }

      const user = await User.updateUser(req.params.username, req.body);
      return res.json({ "Made admin": user });
    } catch (e) {
      return next(e);
    }
  }
);

// update a user's profile

router.patch(
  "/api/users/:username",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        userUpdateSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        // @ts-ignore
        throw new BadRequestError(errors);
      }

      const user = await User.updateUser(req.params.username, req.body);
      return res.json({ user });
    } catch (e) {
      return next(e);
    }
  }
);

// delete a user

router.delete(
  "/api/users/:username",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
