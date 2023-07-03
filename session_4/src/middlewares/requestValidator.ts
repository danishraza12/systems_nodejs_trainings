import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const requestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      console.log("Request validation successful!")
      return next();
    }

    console.log("Request validation failed!")
    res.status(500).send({ errors: result.array() });
  } catch (err) {
    console.log("Error - requestValidator: ", err.message);
    throw new Error(err.message);
  }
};
