// data type
import type { Request, Response, NextFunction } from "express";
import type { UserDataInToken } from "../../src/dtos/user.dto.js";

// jest
import { expect, jest, test } from '@jest/globals';

// function
import { authorizeAdmin } from "../../src/middlewares/authorize"
import { createError } from "../../src/utils/handle-response";
// import { authorizeAdmin } from "middlewares/authorize.js";

describe('test middleware to check authorizion of user role', () => {
    test('user admin can go to next function', async () => {

        const mockUserData: UserDataInToken = {
            userId: 1,
            username: 'Jhon',
            email: 'jhondoe@mail.com',
            isAdmin: true,
        }

        const req = { user: mockUserData } as unknown as Request
        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        await authorizeAdmin(req, res, next)
        expect(next).toHaveBeenCalled()

    })


    test('user not admin cannot go to next function and return error', async () => {

        const mockUserData: UserDataInToken = {
            userId: 1,
            username: 'Jhon',
            email: 'jhondoe@mail.com',
            isAdmin: false,
        }

        const req = { user: mockUserData } as unknown as Request
        const res = {} as Response as any;
        const next = jest.fn() as NextFunction;

        const err = createError('Only Admin can do this', 400)

        await expect(authorizeAdmin(req, res, next)).rejects.toThrow(err);
        expect(next).not.toHaveBeenCalled()
    })
})

// Kenapa perlu pakai as unknown as Request?
// Karena Request bawaan express tidak memiliki property user secara default. Biasanya user itu ditambahkan setelah proses autentikasi (misalnya via Passport), jadi kamu perlu melakukan type casting ganda: