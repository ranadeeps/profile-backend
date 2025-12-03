import express, { NextFunction, Request, Response } from "express";
import http_codes from "http-status-codes";
import {
  create_log,
  get_log_details,
  get_monthly_data,
  get_visitor_count,
} from "./module";
import { typeorm } from "../database";
import { Log } from "./log.model";
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

router.get(
  "/get-visitor-count",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.ACCEPTED).send(await get_visitor_count());
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/leetcode",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await create_log(req, req.query, "leetcode");
      res.redirect("https://ranadeepreddyshyamakura.info/");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/linkedin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await create_log(req, req.query, "linkedin");
      res.redirect("https://ranadeepreddyshyamakura.info/");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/instagram",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await create_log(req, req.query, "instagram");
      res.redirect("https://ranadeepreddyshyamakura.info/");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/monthly-data",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.ACCEPTED).send(await get_monthly_data());
    } catch (error) {
      next(error);
    }
  }
);

export default router;
