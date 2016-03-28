import {Component,Input} from 'angular2/core';
import {Statement} from '../../model/statement';

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
                <p>{{path}}</p>
                
                {{content}}
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
                                <td>{{statement.fromDate.toLocaleDateString("en-US")}}</td>
                                <td>{{statement.toDate.toLocaleDateString("en-US")}}</td>
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
    @Input() statements: Statement[];
    path: string;
    content: string;
    
    uploadStatement(event){
        let files = event.target.files;
        this.path = event.target.value;
        if(files.length){
            let r = new FileReader();
            r.onload = this.processContent;
            let f = files[0];
            r.readAsText(f);
        }
    }
    
    processContent(event){
       this.content =  event.target.result;
    }
}