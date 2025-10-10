// data type
import type { Request, Response, NextFunction } from "express";
import { type AppError, unexpectedErrorHandler } from "../../src/middlewares/unexpected-error-handler";

// jest
import { expect, jest, test } from '@jest/globals';

describe("test middleware for unexpectedErrorHandler", () => {
    test('should return error status 500 and message Internal Server Error', () => {
        const err = {} as AppError
        const req = {} as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        unexpectedErrorHandler(err, req, res, next)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal Server Error'
        })
        expect(next).not.toHaveBeenCalled()
    })

    test('should return error with provided status and message', () => {
        const err = {
            status: 401,
            message: 'Unauthorized'
        } as AppError
        const req = {} as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        unexpectedErrorHandler(err, req, res, next)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unauthorized'
        })
        expect(next).not.toHaveBeenCalled()
    })
})
