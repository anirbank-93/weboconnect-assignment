import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

export default async function requiresUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
    const user = get(req, "user");

    if (!user) {
      console.log("thisssss");
      
        return res.sendStatus(403);
    }

    return next();
}
