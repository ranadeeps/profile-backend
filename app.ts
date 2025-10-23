import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { apiError, authenticationError } from "./utils/error";
import httpcodes from "http-status-codes";
import analytics from "./analytics/router";
const app = express();
app.use(morgan("combined", { stream: process.stdout }));

app.get("/", (req, res: Response, next) =>
  res.status(httpcodes.OK).send("thanks for visiting")
);

app.use(express.json());

app.use("/analytics", analytics);

app.use(
  (
    error: Error | apiError | authenticationError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof apiError) {
      res
        .status(
          typeof error.code == "number" ? error.code : httpcodes.BAD_REQUEST
        )
        .send({ code: error.code, message: error.message });
    } else if (error instanceof authenticationError) {
      res
        .status(httpcodes.UNAUTHORIZED)
        .send({ code: httpcodes.UNAUTHORIZED, message: error.message });
    } else {
      res.status(httpcodes.INTERNAL_SERVER_ERROR).send({
        code: httpcodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
);

export default app;
