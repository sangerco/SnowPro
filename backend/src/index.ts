import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { NotFoundError } from './expressError';
import { authenticateJWT } from './middleware/auth';
import messageRoutes from './routes/messages';
import reviewRoutes from './routes/reviews';
import skiAreaRoutes from './routes/skiAreas';
import userRoutes from './routes/users';
import photoRoutes from './routes/photos';
import videoRoutes from './routes/videos';
import tagRoutes from './routes/tags';
import favMountainRoutes from './routes/favMountains';


import { PORT } from './config'

const app: Express = express();

app.use(cors());
app.use(express.json());
// app.use(morgan('combined')); - deal with this later
app.use(authenticateJWT);

app.use(messageRoutes);
app.use(reviewRoutes);
app.use(skiAreaRoutes);
app.use(userRoutes);
app.use(photoRoutes);
app.use(videoRoutes);
app.use(tagRoutes);
app.use(favMountainRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    return next(new NotFoundError("Route not found."))
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(PORT, () => {
    console.log('Now listening on port 5000');
});