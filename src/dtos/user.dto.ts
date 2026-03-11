import { z } from "zod";
import type {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "../validation-schema/user.valid-schema.js";

// REGISTER
export type RegisterUserPayloadDTO = z.infer<
  typeof registerUserValidationSchema
>;

export interface RegisterUserResponseDTO {
  email: string;
  username: string;
  isAdmin: boolean;
}

// LOGIN
export type LoginUserPayloadDTO = z.infer<typeof loginUserValidationSchema>;

export interface LoginUseResponse {
  accessToken: string;
  refreshToken: string;
}


// DATA IN TOKEN
export interface UserDataInToken {
  userId: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginResponseDTO {
  accessToken: string;
}
