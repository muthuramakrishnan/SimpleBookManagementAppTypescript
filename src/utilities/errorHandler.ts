import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../models/ValidationException";
import { HTTP_STATUSES } from "../constants";
import Joi from "joi";
import logger from "./logger";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (error instanceof Joi.ValidationError) {
  //   res.status(HTTP_STATUSES.BAD_REQUEST.code).json({
  //     message: HTTP_STATUSES.BAD_REQUEST.message,
  //     reason: error.message,
  //     details: error.details,
  //   });
  // }
  if (error instanceof ValidationException) {
    logger.error(error.name, error.errorObj);
    res.status(HTTP_STATUSES.BAD_REQUEST.code).json({
      message: HTTP_STATUSES.BAD_REQUEST.message,
      reason: error.message,
      details: error.errorObj,
    });
  } else {
    logger.error(error.name, error.stack);
    res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR.code)
      .json({ message: HTTP_STATUSES.INTERNAL_SERVER_ERROR.message });
  }
};
