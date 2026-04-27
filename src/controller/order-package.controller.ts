import type { Request, Response, NextFunction } from "express";

// DTO
import type { UserDataInToken } from "../dtos/user.dto.js";
import type { AddOrderPackagePayloadDTO, CreateOrderPackageTourResponseDTO, MetaOrderPackageTourDTO, OrderPackageResponseDTO, OrderPackageTourDetailResponseDTO, OrderPackageTourQueryDTO, ConfirmPaymentPayloadDTO, ConfirmPaymentResponseDTO } from "../dtos/order-package.dto.js";

// service
import OrderPackageService from "../service/order-package.service.js";

// utils
import { createResponse } from "../utils/handle-response.js";
import { PAYMENT_STATUS } from "../lib/enum.js";

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
        "Success order a package tour, complete payment before expired",
        resultAddOrder
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getOrderPackageController = async (
  req: Request<{}, {}, {}, OrderPackageTourQueryDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { getOrderPackage } = OrderPackageService();

    const user: UserDataInToken = req.user as UserDataInToken

    const orderedPackageTour = await getOrderPackage(user, req.query);

    res.json(createResponse<OrderPackageResponseDTO[], MetaOrderPackageTourDTO>(200, "success", "success get orders", orderedPackageTour.data, orderedPackageTour.meta));
  } catch (error) {
    next(error);
  }
};

export const getOrderPackageDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { orderPackageId } = req.params

    const id = parseInt(orderPackageId ?? "", 10)
    const user: UserDataInToken = req.user as UserDataInToken


    const { getOrderPackageDetail } = OrderPackageService();

    const resultOrderPackageDetail = await getOrderPackageDetail(user, id)

    res.json(createResponse<OrderPackageTourDetailResponseDTO>(200, 'success', 'success get order detail', resultOrderPackageDetail))
  } catch (error) {
    next(error);
  }

}

export const confirmPaymentTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { confirmPaymentTransaction } = OrderPackageService();

    const payload: ConfirmPaymentPayloadDTO = req.body;

    const resultConfirmPayment = await confirmPaymentTransaction(payload);

    if(resultConfirmPayment.paymentStatus === PAYMENT_STATUS.WAITING_VERIFICATION){
      res.json(
        createResponse<ConfirmPaymentResponseDTO>(
          200,
          "success",
          "Success order a package tour, please wait for our verification",
          resultConfirmPayment
        )
      );
    } else {
      res.json(
        createResponse<ConfirmPaymentResponseDTO>(
          202,
          "success update payment status",
          "Your payment is expired, contact our customer for refund",
          resultConfirmPayment
        )
      );
    }

  } catch (error) {
    next(error);
  }
};
