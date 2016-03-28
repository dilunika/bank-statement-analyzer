import {Transaction} from './transaction';

export interface Statement {
    accountNumber: string,
    fromDate: Date,
    toDate: Date,
    transactions: Transaction []
}