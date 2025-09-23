// prisma
import { PrismaClient } from "../../generated/prisma/index.js";

// DTO
import type {
  AddOrderPackagePayloadDTO,
  OrderPackageResponseDTO,
} from "../dtos/order-package.dto.js";
import type { UserDataInToken } from "../dtos/user.dto.js";


const prisma = new PrismaClient();

const OrderPackageService = () => {
  const addOrderPackage = async (
    payload: AddOrderPackagePayloadDTO,
    user: UserDataInToken
  ) => {
    const result = prisma.order_package_tour.create({
      data: {
        tour_package_id: payload.tourPackageId,
        status: "NEW",
        payment_method: payload.paymentMethod,
        number_of_guests: payload.numberOfGuests,
        total_payment: payload.totalPayment,
        customer_id: user?.userId,
      },
    });

    return result;
  };

  const getOrderPackage = async (user: UserDataInToken) => {
    const result = await prisma.order_package_tour.findMany({
      where: {
        customer_id: {
          equals: user?.userId
        }
      }
    });

    const convertedResult: OrderPackageResponseDTO[] = result.map((order) => {
      return {
        tourPackageId: order.tour_package_id,
        status: order.status,
        paymentMethod: order.payment_method,
        numberOfGuests: order.number_of_guests,
        totalPayment: order.total_payment,
      };
    });

    return convertedResult;
  };

  return { addOrderPackage, getOrderPackage };
};

export default OrderPackageService;
