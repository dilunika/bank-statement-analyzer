import {Transaction} from './transaction';

export interface Statement {
    accountNumber: string,
    fromDate: string,
    toDate: string,
    transactions: Transaction []
}