import { Request } from "express";
import { v4 } from "uuid";
import { typeorm } from "../database";
import { Log } from "./log.model";
import { ParsedQs } from "qs";
import moment from "moment";
import { channel } from "./router";
export const create_log = async (
  req: Request,
  query: ParsedQs,
  from: string = "others"
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
      console.log(req.ips);
      const splitted_ip = req.ips.length > 0 ? req.ips[0].split(".") : null;
      if (splitted_ip && splitted_ip[0] == "122" && splitted_ip[1] == "177") {
        return null;
      }
      const existing_log_with_ip = await typeorm.manager.findOne(Log, {
        where: { ip: req.ips[0] as string },
        order: { updatedAt: "DESC" },
      });
      if (
        existing_log_with_ip &&
        Math.abs(
          moment(new Date()).diff(existing_log_with_ip.updatedAt, "hour")
        ) <= 1
      ) {
        return existing_log_with_ip;
      } else {
        const uuid = v4();
        channel.broadcast({ ip: req.ips[0] || req.ip, uuid, from }, "log");
        const created_log = await typeorm.manager.save(Log, {
          ip: req.ips[0] || req.ip,
          uuid,
          from,
        });
        return created_log;
      }
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

export const get_monthly_data = async () => {
  try {
    const result = await typeorm
      .getRepository(Log)
      .createQueryBuilder("logs")
      .select("TO_CHAR(logs.createdAt, 'YYYY-MM')", "year_month")
      .addSelect("COUNT(logs.id)", "count")
      .groupBy("year_month")
      .orderBy("year_month", "ASC")
      .getRawMany();
    return result;
  } catch (error) {
    throw error;
  }
};
