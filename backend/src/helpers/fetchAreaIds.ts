import { NotFoundError } from "../expressError";
import axios from "axios";
import { Key, Host } from "../vault/secret";

const url: string = 'https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/monarch';

const fetchSkiAreaId = async (): Promise<string> => {
    const options = {
        headers: {
            'X-RapidAPI-Key': Key,
            'X-RapidAPI-Host': Host
        }
    };

    try {
        const res = await axios.get(url, options);
        return res.data.slug
    } catch (e) {
        console.error(e);
        throw new NotFoundError('Failed to fetch ski area id.')
    }
}

export default fetchSkiAreaId;