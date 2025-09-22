import type { Request, Response, NextFunction } from "express";
import type { UserDataInToken } from "../dtos/user.dto.js";
import { createError } from "../utils/handle-response.js";


export const authorizeAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const user: UserDataInToken = req.user as UserDataInToken;

    if (!user?.isAdmin) {
        throw createError("Only Admin can do this", 404);
    } else {
        return next()
    }

}