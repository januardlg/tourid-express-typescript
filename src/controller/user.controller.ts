import type { Request, Response, NextFunction } from "express";
import Userservice from "../service/user.service.js";
import type {
  LoginUserPayloadDTO,
  RegisterUserPayloadDTO,
} from "../dtos/user.dto.js";
import { createResponse } from "../utils/handle-response.js";

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
    res.json(
      createResponse(200, "success", "succes login user", loginResponse)
    );
  } catch (error) {
    next(error);
  }
};
