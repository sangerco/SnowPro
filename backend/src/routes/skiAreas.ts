import * as jsonschema from "jsonschema";
import express, { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../expressError";
import SkiArea from "../models/skiArea";
import Review from "../models/review";
import reviewNewSchema from "../schemas/reviewNew.json";
import { Key, Host } from "../vault/secret";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  SkiAreaData,
  AllSkiAreasData,
  SkiAreasUsersFavoritedBy,
  SkiAreaReviewDataReturn,
} from "../interfaces/skiAreaInterfaces";
import { checkIfUserOrAdmin, ensureLoggedIn } from "../middleware/auth";

interface ReviewData {
  user_id: string;
  username: string;
  ski_area_slug: string;
  header: string;
  body: string;
  stars: number;
  photos: string[];
  tags: string[];
}

const router = express.Router();

router.get(
  "/ski-areas",
  async (req: Request, res: Response, next: NextFunction) => {
    const baseUrl = "https://api.skiapi.com/v1/resort";

    try {
      let currentPage = 1;
      let totalPages = 6;
      let allSkiAreas: AllSkiAreasData[] = [];

      while (currentPage <= totalPages) {
        const url = `${baseUrl}?page=${currentPage}`;
        const options: AxiosRequestConfig = {
          method: "GET",
          url: url,
          headers: {
            "X-RapidAPI-Key": Key,
            "X-RapidAPI-Host": Host,
          },
        };

        const response = await axios.request(options);
        const { data } = response.data;

        allSkiAreas = [...allSkiAreas, ...data];
        currentPage++;
      }

      for (let skiArea of allSkiAreas) {
        await SkiArea.createSkiArea(skiArea.slug, skiArea.name);
      }
      res.json(allSkiAreas);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  }
);

router.get(
  "/ski-areas/:slug",
  async (req: Request, res: Response, next: NextFunction) => {
    const url = "https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/";
    const slug = req.params.slug;

    try {
      const options: AxiosRequestConfig = {
        method: "GET",
        url: `${url}${slug}`,
        headers: {
          "X-RapidAPI-Key": Key,
          "X-RapidAPI-Host": Host,
        },
      };

      const response = await axios.request(options);
      const skiAreaData: SkiAreaData = response.data.data;

      const getReviewData: SkiAreaReviewDataReturn[] =
        await SkiArea.fetchReviewsBySkiAreaSlug(slug);
      let getUsersFavoritedBy: SkiAreasUsersFavoritedBy[] =
        await SkiArea.returnUsersFavoritedBy(slug);

      if (getUsersFavoritedBy[0].userId === null) {
        getUsersFavoritedBy = [];
      }

      const combinedData = {
        ...skiAreaData,
        reviewData: getReviewData,
        usersFavoritedBy: getUsersFavoritedBy,
      };

      res.json(combinedData);
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the data." });
    }
  }
);

router.post(
  "/api/ski-areas/:slug/review",
  ensureLoggedIn,
  checkIfUserOrAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      const validator: jsonschema.ValidatorResult = jsonschema.validate(
        req.body,
        reviewNewSchema
      );
      if (!validator.valid) {
        const errors: string | string[] = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errors);
      }
      const {
        user_id,
        username,
        ski_area_slug,
        header,
        body,
        stars,
        photos,
        tags,
      }: ReviewData = req.body;
      const review = await Review.createReview(
        user_id,
        username,
        ski_area_slug,
        header,
        body,
        stars,
        photos,
        tags
      );
      return res.status(201).json({ review });
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
