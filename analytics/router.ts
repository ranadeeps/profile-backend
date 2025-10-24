import express, { NextFunction, Request, Response } from "express";
import http_codes from "http-status-codes";
import { create_log, get_log_details } from "./module";
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
router.get(
  "/get-log-details",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.ACCEPTED).send(await get_log_details());
    } catch (error) {
      next(error);
    }
  }
);

export default router;
