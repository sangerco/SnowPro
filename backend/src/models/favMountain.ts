import db from '../db';
import { NotFoundError } from '../expressError';
import { v4 as uuidv4 } from 'uuid';

interface FavMountainData {
    userId: string;
    skiAreaId: string
}

class FavMountain {
    static async createFavMountain(userId: string, skiAreaId: string): Promise<FavMountainData> {
        const id = uuidv4();

        const result = await db.query(`
            INSERT INTO fav_mountains
            (   id,
                user_id,
                ski_area_id)
            VALUES ($1, $2, $3)
            RETURNING id, user_id AS "userId, ski_area_id AS "skiAreaId`,
            [id, userId, skiAreaId]
        );
        const favMountain = result.rows[0];

        return favMountain;
    }

    static async remove(id: string): Promise<void> {
        const result = await db.query(
            `DELETE FROM fav_mountains
                WHERE id = $1
                RETURNING id`,
                [id]
        );
        const favMountain = result.rows[0];

        if (!favMountain) throw new NotFoundError('Favorite not found!');
    }
}

export default FavMountain;