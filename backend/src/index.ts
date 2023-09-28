import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "./expressError";
import messageRoutes from "./routes/messages";
import messageReplyRoutes from "./routes/messageReplies";
import reviewRoutes from "./routes/reviews";
import skiAreaRoutes from "./routes/skiAreas";
import userRoutes from "./routes/users";
import photoRoutes from "./routes/photos";
import videoRoutes from "./routes/videos";
import tagRoutes from "./routes/tags";
import favMountainRoutes from "./routes/favMountains";
import { PORT } from "./config";
import express, { Express } from "express";
import cors from "cors";
import { authenticateJWT } from "./middleware/auth";
// import createServer from "./server";

export const app: Express = express();

app.use(cors());
app.use(authenticateJWT);
app.use(express.json());

app.use(messageRoutes);
app.use(messageReplyRoutes);
app.use(reviewRoutes);
app.use(skiAreaRoutes);
app.use(userRoutes);
app.use(photoRoutes);
app.use(videoRoutes);
app.use(tagRoutes);
app.use(favMountainRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError("Route not found."));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log("Now listening on port 5000");
});
