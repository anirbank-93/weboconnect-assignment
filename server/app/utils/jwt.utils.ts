import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const privateKey = process.env.PRIVATE_KEY as string;

export function sign(object: Object, options?: SignOptions) {
  console.log(object);
  console.log(privateKey);
  
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
    console.log("in decode", error);
    
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: undefined,
    };
  }
}
