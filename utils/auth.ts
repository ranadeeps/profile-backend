import * as jwt from "jsonwebtoken";
import { jwtsecret } from "./config";

export const generateFileToken = (
  id: number,
  expiryInMinutes: number,
): string => {
  try {
    const token =
      expiryInMinutes == -1
        ? jwt.sign({ id }, jwtsecret)
        : jwt.sign({ id }, jwtsecret, {
            expiresIn: `${expiryInMinutes}m`,
          });
    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyFileToken = (token: string): number => {
  try {
    const decoded: any = jwt.verify(token, jwtsecret);
    return decoded.id;
  } catch (error) {
    throw error;
  }
};
