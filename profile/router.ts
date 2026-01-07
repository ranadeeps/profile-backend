import express, { NextFunction, Request, Response, Router } from "express";
import http_codes from "http-status-codes";
import { get_messages, save_message } from "./module";

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

router.get(
  "/get-messages/:page",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.ACCEPTED).json(await get_messages(req));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/download-resume",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.download("/var/thetruetouch/mdms/ranadeep_cv.pdf", "ranadeep_cv.pdf");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
