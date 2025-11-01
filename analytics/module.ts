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
      Math.abs(moment(new Date()).diff(existing_log.createdAt, "hour")) <= 1
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

export const get_log_details = async () => {
  const count = await typeorm.manager.count(Log);
  const lastFiveLogs = await typeorm.manager.find(Log, {
    order: { createdAt: "DESC" },
    take: 5,
  });
  let res_html = `<p>Total count: ${count}</p><br/>`;
  for (let i = 0; i < lastFiveLogs.length; i++) {
    res_html += `${lastFiveLogs[i].ip} - ${
      lastFiveLogs[i].uuid
    } - ${lastFiveLogs[i].createdAt.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    })} <br/>`;
  }
  return res_html;
};
