
export interface PaymentMethodDTO {
    payment_methods_id: number,
    code: string,
    name: string,
    type: string,
    destination_account: string,
    is_active: boolean,
    created_at: Date
}