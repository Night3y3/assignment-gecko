import express, { Router, Request, Response, NextFunction } from "express";

import { getDeviationHandler, getStatsHandler } from "./lib/handler";

const router = Router();

router.get("/stats", getStatsHandler);
router.get("/deviation", getDeviationHandler);

export default router;
