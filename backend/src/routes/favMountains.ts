import * as jsonschema from "jsonschema";
import express, { Request, Response, NextFunction } from "express";
import { ensureLoggedIn, checkIfUserOrAdmin } from "../middleware/auth";
import { BadRequestError } from "../expressError";
import FavMountain from "../models/favMountain";
import favMountainSchema from "../schemas/favMountain.json";

const router = express.Router();

interface FavMountainData {
  userId: string;
  skiAreaSlug: string;
}

router.post(
  "/api/fav-mountain",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        favMountainSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errors);
      }
      const { userId, skiAreaSlug }: FavMountainData = req.body;
      const favMountain = await FavMountain.createFavMountain(
        userId,
        skiAreaSlug
      );
      return res.status(201).json({ favMountain });
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/users/:username/fav-mountains",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favMountains = await FavMountain.fetchFavMountainDataByUsername(
        req.params.username
      );
      console.log(favMountains);
      return res.status(200).json({ favMountains });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/ski-areas/:slug/users-favorited-by",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favMountains = await FavMountain.fetchFavMountainDataBySkiAreaSlug(
        req.params.slug
      );
      console.log(favMountains);
      return res.status(200).json({ favMountains });
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/api/fav-mountain/:username/:slug",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await FavMountain.remove(req.params.username, req.params.slug);
      return res.status(200).json({
        deleted: `Favorite`,
      });
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
