import type { Request, Response, NextFunction } from "express";

// DTO
import type { UserDataInToken } from "../dtos/user.dto.js";
import type { AddOrderPackagePayloadDTO } from "../dtos/order-package.dto.js";

// service
import OrderPackageService from "../service/order-package.service.js";

// utils
import { createResponse } from "../utils/handle-response.js";

export const addOrderPackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { addOrderPackage } = OrderPackageService();

    const user: UserDataInToken = req.user as UserDataInToken;
    const payload: AddOrderPackagePayloadDTO = req.body;

    const resultAddOrder = await addOrderPackage(payload, user);

    res.json(
      createResponse(
        200,
        "success",
        "success add order a package",
        resultAddOrder
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getOrderPackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { getOrderPackage } = OrderPackageService();

    const user: UserDataInToken = req.user as UserDataInToken

    const orders = await getOrderPackage(user);

    res.json(createResponse(200, "success", "success get orders", orders));
  } catch (error) {
    next(error);
  }
};
