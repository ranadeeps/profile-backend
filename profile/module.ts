import { Request } from "express";
import { apiError } from "../utils/error";
import { typeorm } from "../database";
import { Message } from "./message.model";

export async function save_message(req: Request) {
  try {
    const payload: { name: string; email: string; message: string } = req.body;
    if (!payload.name || !payload.email || !payload.message) {
      throw new apiError("REQUEST_ERROR", "Name / Email / Message not found");
    }
    const saved_message = await typeorm.manager.save(Message, {
      ip: req.ips[0] || req.ip,
      name: payload.name,
      email: payload.email,
      message: payload?.message || null,
    });
    return {
      success: true,
      message: "Message received",
      saved_message,
    };
  } catch (error) {
    throw error;
  }
}

export async function get_messages(req: Request) {
  try {
    const page: number = req.params.page ? Number(req.params.page) : 1;
    const latest_messages = await typeorm.manager.find(Message, {
      order: { createdAt: "DESC" },
      skip: (page - 1) * 5,
      take: 5,
    });
    return {
      success: true,
      latest_messages,
    };
  } catch (error) {
    throw error;
  }
}
