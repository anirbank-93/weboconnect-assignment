import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey") as string;

export function sign(object: Object, options?: SignOptions) {
  return jwt.sign(object, privateKey, options);
}

interface decodedValues {
  valid: boolean;
  expired: boolean;
  decoded?: string | JwtPayload | Array<string> | Array<JwtPayload>;
}

export function decode(token: string | Array<string>): decodedValues {
  try {
    if (typeof token === "string") {
      const decoded = jwt.verify(token, privateKey);
      console.log("decoded token", decoded);
      

      return { valid: true, expired: false, decoded };
    } else {
      return { valid: true, expired: false, decoded: undefined };
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: undefined,
    };
  }
}
