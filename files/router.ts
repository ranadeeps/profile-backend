import express, { NextFunction, Request, Response } from "express";
import { typeorm } from "../database";
import { File } from "../profile/file.model";
import { apiError } from "../utils/error";
import path from "node:path";
import { password } from "../utils/config";
import http_codes from "http-status-codes";
import { getFileLink } from "./module";
import { verifyFileToken } from "../utils/auth";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;
    const { page = 1, limit = 5 } = query;
    const [files, totalCount] = await typeorm.manager.findAndCount(File, {
      where: { isDeleted: "N" },
      select: {
        id: true,
        fileSizeInBytes: true,
        mimeType: true,
        createdAt: true,
        fileType: true,
        originalFileName: true,
      },
      skip: (Number(page) - 1) * Number(limit),
      order: { createdAt: "DESC" },
      take: Number(limit),
    });
    res.status(http_codes.ACCEPTED).send({
      files,
      total: totalCount,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalCount / Number(limit)),
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/view-file/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const file = await typeorm.manager.findOne(File, {
        where: { id: Number(id), isDeleted: "N" },
      });
      if (!file) {
        throw new apiError(400, "File not found");
      }
      await typeorm.manager.increment(File, { id: file.id }, "totalViews", 1);
      res.sendFile(path.join(file.destination, file.fileName));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/download-file/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const file = await typeorm.manager.findOne(File, {
        where: { id: Number(id), isDeleted: "N" },
      });
      if (!file) {
        throw new apiError(400, "File not found");
      }
      await typeorm.manager.increment(
        File,
        { id: file.id },
        "totalDownloads",
        1,
      );
      res.download(path.join(file.destination, file.fileName), file.fileName);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/delete-file/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { password: req_password } = req.body;
      if (req_password != password) {
        throw new apiError(400, "Invalid password");
      }
      await typeorm.manager.update(File, { id: id }, { isDeleted: "Y" });
      res
        .status(http_codes.ACCEPTED)
        .send({ success: true, message: "file deleted" });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/get-file-link/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .status(http_codes.ACCEPTED)
        .send(await getFileLink(Number(req.params.id), req.query));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/view-file-temporary",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.query;
      const fileId = verifyFileToken(token as string);
      const file = await typeorm.manager.findOne(File, {
        where: { id: Number(fileId), isDeleted: "N" },
      });
      if (!file) {
        throw new apiError(400, "File not found");
      }
      res.sendFile(path.join(file.destination, file.fileName));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
