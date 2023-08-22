import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import db from "../db";
import { UnauthorizedError } from "../expressError";

const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (e) {
    return next();
  }
};

const ensureLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!res.locals.user) throw new UnauthorizedError("Unauthorized");
    return next();
  } catch (e) {
    return next();
  }
};

const checkIfAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (res.locals.user.isAdmin === false)
      throw new UnauthorizedError("Unauthorized");
    return next();
  } catch (e) {
    return next();
  }
};

const checkIfUserOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user = res.locals.user;
    if (user.username !== req.params.username && user.isAdmin === false)
      throw new UnauthorizedError("Unauthorized");
    return next();
  } catch (e) {
    return next();
  }
};

export { authenticateJWT, ensureLoggedIn, checkIfAdmin, checkIfUserOrAdmin };
