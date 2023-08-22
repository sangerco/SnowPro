import * as jsonschema from "jsonschema";
import express, { Request, Response, NextFunction } from "express";
import { ensureLoggedIn, checkIfUserOrAdmin } from "../middleware/auth";
import { BadRequestError } from "../expressError";
import Video from "../models/video";
import videoNewSchema from "../schemas/videoLinkNew.json";
import updateVideoSchema from "../schemas/updateVideo.json";

const router = express.Router();

interface VideoData {
  username: string;
  link: string;
  about: string;
  tagIds: string[];
}

router.post(
  "/api/videos",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        videoNewSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errors);
      }
      const { username, link, about, tagIds }: VideoData = req.body;
      const video = await Video.createVideo(username, link, about, tagIds);
      return res.status(201).json({ video });
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/video/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const video = await Video.getVideo(req.params.id);
      return res.json({ video });
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/users/:username/videos",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const videos = await Video.getVideosByUsername(req.params.username);
      return res.json({ videos });
    } catch (e) {
      return next(e);
    }
  }
);

router.patch(
  "/api/video/:id",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        updateVideoSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errors);
      }
      const video = await Video.updateVideo(req.params.id, req.body);
      return res.json({ video });
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/api/video/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Video.removeVideo(req.params.id);
      return res.json({ deleted: `Video removed ${req.params.id}` });
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
