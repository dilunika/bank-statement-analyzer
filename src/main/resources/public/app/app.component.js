System.register(['angular2/core', './widgets/statements/hello', './model/transaction', './widgets/statements/statement_list'], function(exports_1, context_1) {
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
    var core_1, hello_1, transaction_1, statement_list_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hello_1_1) {
                hello_1 = hello_1_1;
            },
            function (transaction_1_1) {
                transaction_1 = transaction_1_1;
            },
            function (statement_list_1_1) {
                statement_list_1 = statement_list_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.statements = [
                        {
                            accountNumber: '01-002-333423-00',
                            fromDate: '2016-01-01',
                            toDate: '2016-01-31',
                            transactions: [
                                { date: '2016-01-01', amount: 100.00, paymentType: transaction_1.PaymentType.CREDIT, vendor: '' }
                            ]
                        },
                        {
                            accountNumber: '01-002-333423-01',
                            fromDate: '2016-02-01',
                            toDate: '2016-02-28',
                            transactions: [
                                { date: '2016-01-01', amount: 100.00, paymentType: transaction_1.PaymentType.CREDIT, vendor: '' }
                            ]
                        },
                        {
                            accountNumber: '01-002-333423-01',
                            fromDate: '2016-03-01',
                            toDate: '2016-03-28',
                            transactions: [
                                { date: '2016-01-01', amount: 100.00, paymentType: transaction_1.PaymentType.CREDIT, vendor: '' }
                            ]
                        }
                    ];
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'bsa-app',
                        templateUrl: 'app/app-template.html',
                        directives: [hello_1.HelloComponent, statement_list_1.StatementList]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map