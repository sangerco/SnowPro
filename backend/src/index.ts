import express, { Express, Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import cors from 'cors';
const port = 5000;

const app: Express = express();

const apiKey: string = 'd5d3480381msh53bfc1010a93e4dp163156jsn7ec3fa2fb72f';
const apiHost: string = 'ski-resorts-and-conditions.p.rapidapi.com';
const url: string = 'https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/monarch';

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Here we go!')
});

app.get('/resort/example', async (req: Request, res: Response) => {
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: url,
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            }
        };

        const response = await axios.request(options);
        res.json(response.data);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while fetching data.'})
    }
})

app.get('/ski', (req: Request, res: Response) => {
    res.send('Skiers!')
});

app.listen(port, () => {
    console.log('Now listening on port 5000');
});