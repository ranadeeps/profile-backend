import { Request } from "express";
import { v4 } from "uuid";
import { typeorm } from "../database";
import { Log } from "./log.model";
import { ParsedQs } from "qs";
import moment from "moment";
export const create_log = async (
  req: Request,
  query: ParsedQs
): Promise<Log> => {
  try {
    const existing_log = await typeorm.manager.findOne(Log, {
      where: { uuid: query.referenceId as string },
    });
    if (
      existing_log &&
      Math.abs(moment().diff(existing_log.createdAt, "hour")) <= 1
    ) {
      return existing_log;
    } else {
      const uuid = v4();
      const created_log = await typeorm.manager.save(Log, {
        ip: req.ips[0] || req.ip,
        uuid,
      });
      return created_log;
    }
  } catch (error) {
    throw error;
  }
};
