export interface Transaction {
    date: string,
    vendor: string,
    paymentType: PaymentType,
    amount: number
}

export enum PaymentType {
    DEBIT=1,
    CREDIT
}