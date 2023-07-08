import db from '../db';
import { NotFoundError, BadRequestError } from '../expressError';
import fetchSkiAreaId from '../helpers/fetchAreaIds';

interface FavMountainData {
    userId: string;
    skiAreaId: number
}

class FavMountain {
    static async createFavMountain(userId: string, skiAreaId: number): Promise<FavMountainData> {
        
    }
}