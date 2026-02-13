// prisma
import { prisma } from "../lib/prisma.js";

import { v4 as uuidv4 } from 'uuid';

// DTO
import type {
  AddOrderPackagePayloadDTO,
  CreateOrderPackageTourResponseDTO,
  OrderPackageResponseDTO,
  VerifyPaymentPayloadDTO,
  VerifyPaymentResponseDTO,
} from "../dtos/order-package.dto.js";
import type { UserDataInToken } from "../dtos/user.dto.js";
import { PAYMENT_STATUS, TRIGGER_SOURCE } from "../lib/enum.js";

const OrderPackageService = () => {
  const addOrderPackage = async (
    payload: AddOrderPackagePayloadDTO,
    user: UserDataInToken
  ) => {

    return prisma.$transaction(async (tx) => {

      const EXPIRED_PAYMENT_MINUTES = 10
      const now = new Date();
      const expiredPaymentTime = now.getTime() + (EXPIRED_PAYMENT_MINUTES * 60 * 1000)

      const UIDReferenceNumber = uuidv4()

      const referenceNumberGenerate = `TRF-${UIDReferenceNumber}`

      //Hold this row from being modified by other transactions until this transaction finishes.
      await tx.$executeRaw`
        SELECT package_id
        FROM package_tour_product
        WHERE package_id = ${payload.tourPackageId}
        FOR UPDATE
      `

      // get tour product
      const product = await tx.package_tour_product.findUnique({
        where: { package_id: payload.tourPackageId }
      })

      if (!product) {
        throw new Error("Product not found")
      }

      // count availabilty quota
      const ordered_package_tour = await tx.order_package_tour.aggregate({
        where: {
          tour_package_id: payload.tourPackageId,
          payment_status: PAYMENT_STATUS.PAID
        },
        _sum: {
          number_of_guests: true
        }
      })

      const bookedGuests = ordered_package_tour._sum.number_of_guests ?? 0

      if (product.quota - bookedGuests < payload.numberOfGuests) {
        throw new Error("Tour quota is not available")
      }

      const totalBill = (product?.cost as unknown as number * payload.numberOfGuests)

      if (totalBill !== parseInt(payload.totalPayment, 10)) {
        throw new Error("Wrong Amount")
      }

      // insert order data
      const orderPackageTour = await tx.order_package_tour.create({
        data: {
          tour_package_id: payload.tourPackageId,
          payment_status: PAYMENT_STATUS.PENDING,
          payment_method: payload.paymentMethodId,
          number_of_guests: payload.numberOfGuests,
          total_payment: payload.totalPayment,
          customer_id: user?.userId,
          expired_at: new Date(expiredPaymentTime),
          reference_number: referenceNumberGenerate
        }
      });

      // insert transaction for log
      await tx.payment_order_package_transaction.create({
        data: {
          order_package_id: orderPackageTour.order_tour_package_id,
          reference_number: orderPackageTour.reference_number,
          trigger_source: TRIGGER_SOURCE.USER,
          payment_status: PAYMENT_STATUS.PENDING
        }
      })

      const dataResultConvert: CreateOrderPackageTourResponseDTO = {
        orderTourPackageId: orderPackageTour.order_tour_package_id,
        tourPackageId: orderPackageTour.tour_package_id,
        paymentMethodId: orderPackageTour.payment_method,
        paymentStatus: orderPackageTour.payment_status,
        totalPayment: orderPackageTour.total_payment?.toString(),
        referenceNumber: orderPackageTour.reference_number,
        expiredAt: orderPackageTour.expired_at
      }

      return dataResultConvert;

    })

  };

  const getOrderPackage = async (user: UserDataInToken) => {
    const result = await prisma.order_package_tour.findMany({
      where: {
        customer_id: {
          equals: user?.userId
        }
      },
      select: {
        order_tour_package_id: true,
        package_tour_product: {
          select: {
            name_package: true,
            start_date: true,
            end_date: true,
            hostelry_partner: {
              select: {
                hostelry_name: true,
                hostelry_location: true
              }
            }
          },
        },
        payment_status: true,
        payment_methods: {
          select: {
            name: true,
            destination_account: true
          }
        },
        number_of_guests: true,
        total_payment: true,
        reference_number: true,
        created_at: true,
        expired_at: true,
      }
    });

    const convertedResult: OrderPackageResponseDTO[] = result.map((order) => {
      return {
        orderTourPackageId: order.order_tour_package_id as number,
        packageTourName: order.package_tour_product.name_package as string,
        packageTourStartDate: order.package_tour_product.start_date as Date,
        packageTourEndDate: order.package_tour_product.end_date as Date,
        hostelryName: order.package_tour_product.hostelry_partner?.hostelry_name as string,
        hostelryLocation: order.package_tour_product.hostelry_partner?.hostelry_location as string,
        paymentStatus: order.payment_status as string,
        paymentMethodName: order.payment_methods.name as string,
        paymentDestinationAccount: order.payment_methods.destination_account as string,
        numberOfGuests: order.number_of_guests as number,
        totalPayment: order.total_payment.toString(),
        referenceNumber: order.reference_number as string,
        createdAt: order.created_at as Date,
        expiredAt: order.expired_at as Date
      };
    });

    return convertedResult;
  };


  const verifyPaymentTransaction = async (data: VerifyPaymentPayloadDTO) => {

    return prisma.$transaction(async (tx) => {

      const orderPackage = await tx.order_package_tour.findUnique({
        where: { order_tour_package_id: data.orderTourPackageId, reference_number: data.referenceNumber, payment_status: PAYMENT_STATUS.PENDING }
      })

      if (!orderPackage) {
        throw new Error("There is No Pending Payment Order")
      }

      const expiredPaymentTime = new Date(orderPackage.expired_at)
      const nowTime = new Date()

      const isExpired: boolean = nowTime > expiredPaymentTime ? true : false
      const paymentStatus = isExpired ? PAYMENT_STATUS.EXPIRED : PAYMENT_STATUS.WAITING_VERIFICATION

      const result = await prisma.order_package_tour.update({
        where: { order_tour_package_id: data.orderTourPackageId },
        data: {
          payment_status: paymentStatus,
        }
      })

      await tx.payment_order_package_transaction.create({
        data: {
          order_package_id: data.orderTourPackageId,
          reference_number: data.referenceNumber,
          trigger_source: TRIGGER_SOURCE.USER,
          payment_status: paymentStatus
        }
      })

      const convertedResult: VerifyPaymentResponseDTO = {
        orderTourPackageId: result.order_tour_package_id,
        referenceNumber: result.reference_number,
        paymentStatus: result.payment_status,
      }

      return convertedResult
    })
  }

  return { addOrderPackage, getOrderPackage, verifyPaymentTransaction };
};

export default OrderPackageService;
