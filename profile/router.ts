import express, { NextFunction, Request, Response, Router } from "express";
import http_codes from "http-status-codes";
import { get_messages, save_file, save_message } from "./module";
import multer from "multer";
import path from "path";
import { apiError } from "../utils/error";
import { typeorm } from "../database";
import { File } from "./file.model";
const password = process.env.password as string;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router: Router = express.Router();

router.post(
  "/receive-message",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.CREATED).json(await save_message(req));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/get-messages/:page",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(http_codes.ACCEPTED).json(await get_messages(req));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/upload-file",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        password: req_password,
        fileType,
      }: { password: string; fileType: string } = req.body;
      if (!req.file || !req_password || !fileType)
        throw new apiError(400, "Please enter all details");
      if (req_password != password) {
        throw new apiError(400, "Invalid password");
      }
      await save_file(req.file, req.body);
      res.status(http_codes.ACCEPTED).send({ message: "file uploaded" });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/view-resume",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const latest_resume = await typeorm.manager.findOne(File, {
        where: { fileType: "resume" },
        order: { createdAt: "DESC" },
      });
      if (latest_resume)
        res.sendFile(
          path.join(latest_resume.destination, latest_resume.fileName),
        );
      else res.status(http_codes.NOT_FOUND).send({ message: "file not found" });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/download-resume",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const latest_resume = await typeorm.manager.findOne(File, {
        where: { fileType: "resume" },
        order: { createdAt: "DESC" },
      });
      if (latest_resume)
        res.download(
          path.join(latest_resume.destination, latest_resume.fileName),
          "ranadeep_resume.pdf",
        );
      else res.status(http_codes.NOT_FOUND).send({ message: "file not found" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
