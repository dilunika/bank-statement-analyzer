import {Component} from 'angular2/core';
import {HelloComponent} from './widgets/statements/hello';
import {Statement} from './model/statement';
import {Transaction, PaymentType} from './model/transaction';
import {StatementList} from './widgets/statements/statement_list';

@Component({
    selector: 'bsa-app',
    templateUrl: 'app/app-template.html',
    directives: [HelloComponent, StatementList]
})
export class AppComponent { 
    statements: Statement[] = [
        {
            accountNumber:'01-002-333423-00', 
            fromDate: new Date('2016-01-01'), 
            toDate: new Date('2016-01-31'),
            transactions: [
                {date: new Date('2016-01-01'),amount: 100.00,paymentType: PaymentType.CREDIT,vendor: ''}
            ]
        },
        {
            accountNumber:'01-002-333423-01', 
            fromDate: new Date('2016-02-01'), 
            toDate: new Date('2016-02-28'),
            transactions: [
                {date: new Date('2016-01-01'),amount: 100.00,paymentType: PaymentType.CREDIT,vendor: ''}
            ]
        },
        {
            accountNumber:'01-002-333423-01', 
            fromDate: new Date('2016-03-01'), 
            toDate: new Date('2016-03-28'),
            transactions: [
                {date: new Date('2016-01-01'),amount: 100.00,paymentType: PaymentType.CREDIT,vendor: ''}
            ]
        }
    ];
}