import express, { NextFunction, Request, Response } from "express";
import http_codes from "http-status-codes";
import { create_log } from "./module";
const router = express.Router();

router.get(
  "/create-log",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.CREATED).send(await create_log(req, req.query));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
