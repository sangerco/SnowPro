import * as jsonschema from "jsonschema";
import express, { Request, Response, NextFunction } from "express";
import { ensureLoggedIn, checkIfUserOrAdmin } from "../middleware/auth";
import { BadRequestError } from "../expressError";
import Tag from "../models/tag";
import tagNewSchema from "../schemas/tagNew.json";

const router = express.Router();

interface TagData {
  tag: string;
}

router.post(
  "/api/tags",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        tagNewSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errors);
      }
      const { tag }: TagData = req.body;
      const result = await Tag.createTag(tag);
      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }
);

router.get("/tags", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.getTags();
    return res.json({ tags });
  } catch (e) {
    return next(e);
  }
});

router.get(
  "/tags/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag = await Tag.getTag(req.params.id);
      return res.json({ tag });
    } catch (e) {
      return next(e);
    }
  }
);

// return all reviews, photos, videos associated with that tag

router.get(
  "/tags/:id/assoc-items",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag = await Tag.getAssociatedItems(req.params.id);
      return res.json({ tag });
    } catch (e) {
      return next(e);
    }
  }
);

router.delete(
  "/api/tags/:id",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Tag.deleteTag(req.params.id);
      return res.json({ deleted: `Tag deleted: ${req.params.id}` });
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
