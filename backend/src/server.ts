import express, { Express } from "express";
import cors from "cors";
import { authenticateJWT } from "./middleware/auth";

const createServer = () => {
  const app: Express = express();

  app.use(cors());
  app.use(authenticateJWT);
  app.use(express.json());

  return app;
};

export default createServer;
