System.register(['angular2/core', '../../model/transaction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, transaction_1;
    var StatementList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (transaction_1_1) {
                transaction_1 = transaction_1_1;
            }],
        execute: function() {
            StatementList = (function () {
                function StatementList(_ngZone) {
                    this._ngZone = _ngZone;
                    this.statements = new Array();
                }
                StatementList.prototype.uploadStatement = function ($event) {
                    var _this = this;
                    var files = $event.target.files;
                    this.path = $event.target.value;
                    if (files.length) {
                        this._ngZone.runOutsideAngular(function () {
                            _this.readFiles(files, function (event) {
                                _this._ngZone.run(function () {
                                    _this.content = event.target.result;
                                    _this.processContent();
                                });
                            });
                        });
                    }
                };
                StatementList.prototype.readFiles = function (files, doneCallback) {
                    var reader = new FileReader();
                    reader.onloadend = doneCallback;
                    var f = files[0];
                    reader.readAsText(f);
                };
                StatementList.prototype.processContent = function () {
                    var transactions = this.content
                        .trim()
                        .split('\r')
                        .map(function (line) {
                        return line.split(',');
                    })
                        .reduce(function (txs, row) {
                        txs.push({
                            date: transformToISODateString(row[6]),
                            vendor: row[1] + row[3],
                            amount: parseFloat(row[5]),
                            paymentType: transaction_1.PaymentType.CREDIT
                        });
                        return txs;
                    }, []);
                    var fileNameSplitted = this.path
                        .split('\\')[2]
                        .split('.')[0]
                        .split('_');
                    var uploadedStatement = {
                        accountNumber: fileNameSplitted[0],
                        fromDate: fileNameSplitted[2],
                        toDate: fileNameSplitted[3],
                        transactions: transactions
                    };
                    console.log('Uploaded Statement ->' + JSON.stringify(uploadedStatement));
                    this.statements = [uploadedStatement].concat(this.statements);
                    this.statements.pop();
                    function transformToISODateString(nonStandardDate) {
                        var c = nonStandardDate.split('/');
                        var date = c[0];
                        var month = c[1];
                        var year = 2000 + parseInt(c[2]);
                        var dateString = year + '-' + month + '-' + date;
                        console.log('NSD -> ' + nonStandardDate + ' ' + date + month + year);
                        return dateString;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], StatementList.prototype, "statements", void 0);
                StatementList = __decorate([
                    core_1.Component({
                        selector: 'bsa-statement-list',
                        template: "\n    <div class=\"upload-widget\">\n\n        <div class=\"upload-widget-header\">\n            <i class=\"fa fa-credit-card upload-widget-icon\"></i>\n            <span class=\"upload-widget-title\">Bank Statements</span>\n        </div>\n\n        <div class=\"upload-widget-body\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\">\n                    Upload your Statement\n                </div>\n                <div class=\"panel-body\">\n                    <input (change)=\"uploadStatement($event)\" type=\"file\" />\n                </div>\n            </div>\n            \n            <div class=\"panel panel-default\">\n                    <table class=\"table table-hover content\">\n                        <thead>\n                            <tr>\n                                <th>Account Number</th>\n                                <th>From Date</th>\n                                <th>To Date</th>\n                                <th></th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"#statement of statements\">\n                                <td>{{statement.accountNumber}}</td>\n                                <td>{{statement.fromDate}}</td>\n                                <td>{{statement.toDate}}</td>\n                                <td class=\"center\">\n                                    <a href=\"#\"><i class=\"fa fa-eye icon\"></i></a>\n                                    <a href=\"#\"><i class=\"fa fa-trash icon\"></i></a>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div> \n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.NgZone])
                ], StatementList);
                return StatementList;
            }());
            exports_1("StatementList", StatementList);
        }
    }
});
//# sourceMappingURL=statement_list.js.map