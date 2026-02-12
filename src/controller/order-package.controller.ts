import type { Request, Response, NextFunction } from "express";

// DTO
import type { UserDataInToken } from "../dtos/user.dto.js";
import type { AddOrderPackagePayloadDTO, CreateOrderPackageTourResponseDTO, OrderPackageResponseDTO, VerifyPaymentPayloadDTO, VerifyPaymentResponseDTO } from "../dtos/order-package.dto.js";

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
      createResponse<CreateOrderPackageTourResponseDTO>(
        200,
        "success",
        "success order a package tour",
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

    res.json(createResponse<OrderPackageResponseDTO[]>(200, "success", "success get orders", orders));
  } catch (error) {
    next(error);
  }
};

export const verifyPaymentTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verifyPaymentTransaction } = OrderPackageService();

    const payload: VerifyPaymentPayloadDTO = req.body;

    const resultVerifyPayment = await verifyPaymentTransaction(payload);

    res.json(
      createResponse<VerifyPaymentResponseDTO>(
        200,
        "success",
        "success order a package tour",
        resultVerifyPayment
      )
    );
  } catch (error) {
    next(error);
  }
};
