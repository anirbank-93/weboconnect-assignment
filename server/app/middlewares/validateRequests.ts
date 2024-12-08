import { AnySchema } from "yup";
import { Request, Response, NextFunction, query } from "express";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error: any) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Request not valid.",
          error: error.message,
        });
    }
  };

export default validate