import {Component,Input, NgZone} from 'angular2/core';
import {Statement} from '../../model/statement';
import {Transaction, PaymentType} from '../../model/transaction';

@Component({
    selector: 'bsa-statement-list',
    template: `
    <div class="upload-widget">

        <div class="upload-widget-header">
            <i class="fa fa-credit-card upload-widget-icon"></i>
            <span class="upload-widget-title">Bank Statements</span>
        </div>

        <div class="upload-widget-body">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Upload your Statement
                </div>
                <div class="panel-body">
                    <input (change)="uploadStatement($event)" type="file" />
                </div>
            </div>
            
            <div class="panel panel-default">
                    <table class="table table-hover content">
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="#statement of statements">
                                <td>{{statement.accountNumber}}</td>
                                <td>{{statement.fromDate}}</td>
                                <td>{{statement.toDate}}</td>
                                <td class="center">
                                    <a href="#"><i class="fa fa-eye icon"></i></a>
                                    <a href="#"><i class="fa fa-trash icon"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> 
        </div>
    `
})
export class StatementList { 
    
    @Input() statements: Statement[] = new Array<Statement>();
    path: string;
    content: string;
    stm: string;
    
    constructor(private _ngZone: NgZone){}
    
    uploadStatement($event){
        let files = $event.target.files;
        this.path = $event.target.value;
        if(files.length){
            
            this._ngZone.runOutsideAngular(() => {
                this.readFiles(files, (event: any)=> {
                    this._ngZone.run(() => {
                         this.content = event.target.result;
                         this.processContent();
                    });
                });
                
            });
        }
    }
    
    readFiles(files: File[],doneCallback: (event: any) => void){
        let reader: FileReader = new FileReader();
        reader.onloadend = doneCallback;
        let f = files[0];
        reader.readAsText(f);
    }
    
    processContent(){

        let transactions: Transaction[] = this.content
                    .trim()
                    .split('\r')
                    .map(function(line: string){
                        return line.split(',')
                    })
                    .reduce(function(txs: Transaction[],row){
                        txs.push({
                            date: transformToISODateString(row[6]),
                            vendor: row[1] + row[3],
                            amount: parseFloat(row[5]),
                            paymentType: PaymentType.CREDIT
                        });
                        return txs;
                    }, []);
        
        let fileNameSplitted = this.path
                                    .split('\\')[2]
                                    .split('.')[0]
                                    .split('_');
        let uploadedStatement: Statement = {
            accountNumber:fileNameSplitted[0], 
            fromDate: fileNameSplitted[2], 
            toDate: fileNameSplitted[3],
            transactions: transactions
        };
        console.log('Uploaded Statement ->' + JSON.stringify(uploadedStatement));

        this.statements = [uploadedStatement].concat(this.statements); 
        this.statements.pop();    
        
        function transformToISODateString(nonStandardDate: string): string {
            let c = nonStandardDate.split('/');
            let date = c[0];
            let month = c[1];
            let year = 2000 + parseInt(c[2]);
            let dateString = year + '-' + month + '-' + date;
            console.log('NSD -> ' + nonStandardDate + ' ' + date + month + year);
            
            return dateString;
        } 
    }
    
    
}