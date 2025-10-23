import { Request } from "express";
import { v4 } from "uuid";
import { typeorm } from "../database";
import { Log } from "./log.model";
export const create_log = async (req: Request): Promise<Log> => {
  try {
    const uuid = v4();
    const created_log = await typeorm.manager.save(Log, {
      ip: req.ips[0] || req.ip,
      uuid,
    });

    return created_log;
  } catch (error) {
    throw error;
  }
};
