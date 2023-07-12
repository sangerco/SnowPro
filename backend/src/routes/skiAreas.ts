import db from '../db';
import express, { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from '../expressError';
import SkiArea from '../models/skiArea';

import { Key, Host } from '../vault/secret';
import axios, { AxiosRequestConfig } from 'axios';

import { SkiAreaData, SkiAreaReviewData } from '../interfaces/skiAreaInterfaces';
import { AllSkiAreasData } from '../interfaces/skiAreaInterfaces';

const router = express.Router();

router.get('/ski-areas', async (req: Request, res: Response, next: NextFunction) => {
    const url = 'https://api.skiapi.com/v1/resort'
    
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: url,
            headers: {
                'X-RapidAPI-Key': Key,
                'X-RapidAPI-Host': Host
            }
        };

        const response = await axios.request(options);
        const skiAreas: AllSkiAreasData[] = response.data;
        
        for (let skiArea of skiAreas) {
            await SkiArea.createSkiArea(skiArea.slug, skiArea.name)
        }

        res.json(skiAreas);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while fetching data.'})
    };
});

router.get('/ski-areas/:slug', async (req: Request, res: Response, next: NextFunction) => {
    const url = 'https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/'
    const slug = req.params.slug;

    try {
        const options: AxiosRequestConfig = {
            method: "GET",
            url: `${url}${slug}`,
            headers: {
                'X-RapidAPI-Key': Key,
                'X-RapidAPI-Host': Host
            }            
        };

        const response = await axios.request(options);
        const skiAreaData: SkiAreaData = response.data;

        const getReviewData: SkiAreaReviewData[] = await SkiArea.returnReviewDataBySlug(slug);

        const combinedData = {
            ...skiAreaData,
            reviewData: getReviewData
        }

        res.json(combinedData);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while fetching the data.' })
    };
})

export default router;