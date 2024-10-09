import express, { Router, Request, Response, NextFunction } from "express";
import { getStats } from "../controller/stats";
import { getDeviation } from "../controller/deviation";

const getStatsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getStats(req, res);
  } catch (error) {
    next(error);
  }
};

const getDeviationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getDeviation(req, res);
  } catch (error) {
    next(error);
  }
};

export { getStatsHandler, getDeviationHandler };
