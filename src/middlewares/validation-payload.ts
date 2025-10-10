// src/middleware/validationMiddleware.ts
import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// import { StatusCodes } from 'http-status-codes';

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }))
                // console.log("error =", error.issues)
                res.status(400).json({ error: 'Invalid data', details: errorMessages });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}


// describe('test input validation using zod', () => {
//     test('should run next function if request body valid', () => {



//         let req: Partial<Request>;
//         let res: Partial<Response>;
//         let next: jest.MockedFunction<NextFunction>;

//         beforeEach(() => {
//             req = {};
//             res = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn(),
//             };
//             next = jest.fn();
//         });

//         const mockDataInputBlog = {
//             title: "Perjalanan Sibolga",
//             blog: "keliling laut dan lain...",
//             images: "base64",
//             author_id: 1
//         }

//         const middleware = validateData(createBlogPayloadSchema)
//         middleware(req as Request, res as Response, next);


//     })
// })