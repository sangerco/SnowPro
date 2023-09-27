import * as jsonschema from "jsonschema";
import express, { Request, Response, NextFunction } from "express";
import { ensureLoggedIn, checkIfUserOrAdmin } from "../middleware/auth";
import { BadRequestError } from "../expressError";
import FavMountain from "../models/favMountain";
import favMountainSchema from "../schemas/favMountain.json";

const router = express.Router();

interface FavMountainData {
  user_id: string;
  ski_area_slug: string;
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
      const { user_id, ski_area_slug }: FavMountainData = req.body;
      const favMountain = await FavMountain.createFavMountain(
        user_id,
        ski_area_slug
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
      const favMountains = await FavMountain.fetchFavMountainDataByUserId(
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
        deleted: `Favorite ${(req.params.username, req.params.slug)}`,
      });
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
