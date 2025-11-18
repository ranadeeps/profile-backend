import { Request } from "express";
import { v4 } from "uuid";
import { typeorm } from "../database";
import { Log } from "./log.model";
import { ParsedQs } from "qs";
import moment from "moment";
export const create_log = async (
  req: Request,
  query: ParsedQs
): Promise<Log | null> => {
  try {
    const existing_log = await typeorm.manager.findOne(Log, {
      where: { uuid: query.referenceId as string },
    });
    if (
      existing_log &&
      Math.abs(moment(new Date()).diff(existing_log.updatedAt, "hour")) <= 1
    ) {
      const updated_log = await typeorm.manager.update(
        Log,
        { id: existing_log.id },
        { updatedAt: new Date() }
      );
      return await typeorm.manager.findOne(Log, {
        where: { uuid: query.referenceId as string },
      });
    } else {
      const splitted_ip = req.ips[0].split(".");
      if (splitted_ip[0] == "122" && splitted_ip[1] == "177") {
        return null;
      }
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

export const get_visitor_count = async () => {
  const count = await typeorm.manager.count(Log);
  return { count };
};
