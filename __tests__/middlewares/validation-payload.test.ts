// data type
import type { Request, Response, NextFunction } from "express";

// jest
import { expect, jest, test } from '@jest/globals';

import { validateData } from "../../src/middlewares/validation-payload"
import { createBlogPayloadSchema } from "../../src/validation-schema/blog.valid-schema"


describe('test input validation using zod', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {} as unknown as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        next = jest.fn();
    });

    test('should run next function if request body valid', () => {
        const mockDataInputBlog = {
            title: "Perjalanan Sibolga",
            blog: "keliling laut dan lain...",
            images: "base64",
            authorId: 1
        }

        req.body = mockDataInputBlog
        const middleware = validateData(createBlogPayloadSchema)
        middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    })


    test('should return error if request body ivalid - invalid authorId data type', () => {
        const mockDataInputBlog = {
            title: "Perjalanan Sibolga",
            blog: "keliling laut dan lain...",
            images: "base64",
            authorId: "1"
        }

        req.body = mockDataInputBlog

        const middleware = validateData(createBlogPayloadSchema)
        middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: 'Invalid data',
                details: [
                    {
                        message: "authorId is Invalid input: expected number, received string"
                    }
                ]
            })
        );
        expect(next).not.toHaveBeenCalled();
    })
})