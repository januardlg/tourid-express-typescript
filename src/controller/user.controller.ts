import type { Request, Response, NextFunction } from "express";
import Userservice from "../service/user.service.js";
import type {
  LoginUserPayloadDTO,
  RegisterUserPayloadDTO,
} from "../dtos/user.dto.js";
import { createError, createResponse } from "../utils/handle-response.js";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { registerUser } = Userservice();

  const payload: RegisterUserPayloadDTO = req.body;

  try {
    const responseRegister = await registerUser(payload);

    res.json(
      createResponse(200, "success", "succes register user", responseRegister)
    );
  } catch (error) {
    next(error);
  }
};

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loginUser } = Userservice();
  const payload: LoginUserPayloadDTO = req.body;

  try {
    const loginResponse = await loginUser(payload);


    // Assigning refresh token in http-only cookie 
    res.cookie('jwt', loginResponse.refreshToken, {
      httpOnly: true,
      sameSite: 'none', secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json(
      createResponse(200, "success", "succes login user", loginResponse)
    );
  } catch (error) {
    next(error);
  }
};


export const getNewAccessTokenController = async (req: Request,
  res: Response,
  next: NextFunction) => {

  if (req.cookies?.jwt) {
    const refreshToken: string = req.cookies.jwt;

    const { getNewAccessToken } = Userservice();

    try {
      const resultNewAccessToken = await getNewAccessToken(refreshToken)

      console.log({ resultNewAccessToken })
      res.json(createResponse(200, "success", "success get new access token", resultNewAccessToken))

    } catch (error) {
      next(error)
    }

  } else {
    throw createError('Unauthorized', 406)
  }

}
