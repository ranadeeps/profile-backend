import express, { NextFunction, Request, Response, Router } from "express";
import http_codes from "http-status-codes";
import { save_message } from "./module";

const router: Router = express.Router();

router.post(
  "/receive-message",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.CREATED).json(await save_message(req));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
