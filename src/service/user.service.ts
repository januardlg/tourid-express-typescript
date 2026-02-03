import { prisma } from "../lib/prisma.js";

// encrypt password
import bycript from "bcrypt";

import jwt from "jsonwebtoken";

// type
import type {
  LoginUseResponse,
  LoginUserPayloadDTO,
  RegisterUserPayloadDTO,
  RegisterUserResponseDTO,
  UserDataInToken,
} from "../dtos/user.dto.js";
import { createError } from "../utils/handle-response.js";



const Userservice = () => {



  const generateAccessToken = (user: Partial<UserDataInToken>) => {

    const accessToken = jwt.sign(
      {
        userId: user?.userId,
        username: user?.username,
        email: user?.email,
      },
      process.env.secretKey as string,
      {
        expiresIn: 3600,
      }
    );

    return accessToken

  }


  const generatedRefreshToken = (user: Partial<UserDataInToken>) => {
    const refreshToken = jwt.sign(
      {
        userId: user?.userId,
        username: user?.username,
        email: user?.email,
      },
      process.env.secretKeyRefreshToken as string,
      {
        expiresIn: '1d'
      }
    );

    return refreshToken
  }

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

    const convertExistingUser: Partial<UserDataInToken> = {
      userId: existingUser?.user_id,
      email: existingUser?.email,
      username: existingUser?.username
    }


    const accessToken = generateAccessToken(convertExistingUser)

    const refreshToken = generatedRefreshToken(convertExistingUser)

    const convertedResult: LoginUseResponse = {
      accessToken: accessToken,
      refreshToken: refreshToken
    };

    return convertedResult;
  };


  const getNewAccessToken = async (refreshToken: string) => {

    let newToken
    jwt.verify(refreshToken, process.env.secretKeyRefreshToken as string, // Verifying refresh token
      async (err, decoded: any) => {
        if (err) {

          throw createError('Unauthorized', 406)
        }
        else {
          newToken = generateAccessToken(decoded)
        }
      })


    return { accessToken: newToken }

  }

  return {
    registerUser,
    loginUser,
    getNewAccessToken
  };
};

export default Userservice;
