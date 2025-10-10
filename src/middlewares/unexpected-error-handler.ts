import type { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    status?: number;
}

export const unexpectedErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.error("err", err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};
