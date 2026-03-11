
export interface PaymentMethodResponseDTO {
    paymentMethodsId: number,
    code: string,
    name: string,
    type: string,
    destinationAccount: string,
    isActive: boolean,
    createdAt: Date
}