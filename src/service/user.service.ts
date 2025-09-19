import { PrismaClient } from "../../generated/prisma/index.js";

// encrypt password
import bycript from "bcrypt";

import jwt from "jsonwebtoken";

// type
import type {
  LoginUseResponseDTO,
  LoginUserPayloadDTO,
  RegisterUserPayloadDTO,
  RegisterUserResponseDTO,
} from "../dtos/user.dto.js";
import { createError } from "../utils/handle-response.js";

const prisma = new PrismaClient();

const Userservice = () => {
  const registerUser = async (payload: RegisterUserPayloadDTO) => {
    const hashedPassword = await bycript.hash(payload.password, 10);

    const result = await prisma.users.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
        is_admin: false,
      },
      select: {
        email: true,
        username: true,
        is_admin: true,
      },
    });

    const convertedResult: RegisterUserResponseDTO = {
      email: result.email,
      username: result.username,
      isAdmin: result.is_admin,
    };

    return convertedResult;
  };

  const loginUser = async (payload: LoginUserPayloadDTO) => {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!existingUser) {
      throw createError("User not registered", 404);
    }

    const isPasswordValid = await bycript.compare(
      payload.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw createError("Invalid credentials", 401);
    }

    let token = jwt.sign(
      {
        userId: existingUser.user_id,
        username: existingUser.username,
        email: existingUser.email,
      },
      process.env.secretKey as string,
      {
        expiresIn: 3600,
      }
    );

    // console.log("existingUser", existingUser);

    const convertedResult: LoginUseResponseDTO = {
      token: token,
    };

    return convertedResult;
  };

  return {
    registerUser,
    loginUser,
  };
};

export default Userservice;
