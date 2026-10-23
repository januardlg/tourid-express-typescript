import { rateLimit } from "express-rate-limit";
import type { Request, Response } from "express";

const rateLimitHandler = (_req: Request, res: Response) => {
  res.status(429).json({
    statusCode: 429,
    message:
      "Sorry, For the common good, a request limit is in place. Please try again later. ",
  });
};

export const commonRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 70,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

export const userRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});
