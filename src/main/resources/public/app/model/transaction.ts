export interface Transaction {
    date: Date,
    vendor: string,
    paymentType: PaymentType,
    amount: number
}

export enum PaymentType {
    DEBIT=1,
    CREDIT
}