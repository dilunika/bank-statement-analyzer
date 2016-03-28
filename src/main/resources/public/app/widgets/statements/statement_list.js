System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var StatementList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            StatementList = (function () {
                function StatementList() {
                }
                StatementList.prototype.uploadStatement = function (event) {
                    var files = event.target.files;
                    this.path = event.target.value;
                    if (files.length) {
                        var r = new FileReader();
                        r.onload = this.processContent;
                        var f = files[0];
                        r.readAsText(f);
                    }
                };
                StatementList.prototype.processContent = function (event) {
                    this.content = event.target.result;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], StatementList.prototype, "statements", void 0);
                StatementList = __decorate([
                    core_1.Component({
                        selector: 'bsa-statement-list',
                        template: "\n    <div class=\"upload-widget\">\n\n        <div class=\"upload-widget-header\">\n            <i class=\"fa fa-credit-card upload-widget-icon\"></i>\n            <span class=\"upload-widget-title\">Bank Statements</span>\n        </div>\n\n        <div class=\"upload-widget-body\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\">\n                    Upload your Statement\n                </div>\n                <div class=\"panel-body\">\n                    <input (change)=\"uploadStatement($event)\" type=\"file\" />\n                </div>\n            </div>\n        \n            <div class=\"panel panel-default\">\n                <p>{{path}}</p>\n                \n                {{content}}\n            </div>\n            \n            <div class=\"panel panel-default\">\n                    <table class=\"table table-hover content\">\n                        <thead>\n                            <tr>\n                                <th>Account Number</th>\n                                <th>From Date</th>\n                                <th>To Date</th>\n                                <th></th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"#statement of statements\">\n                                <td>{{statement.accountNumber}}</td>\n                                <td>{{statement.fromDate.toLocaleDateString(\"en-US\")}}</td>\n                                <td>{{statement.toDate.toLocaleDateString(\"en-US\")}}</td>\n                                <td class=\"center\">\n                                    <a href=\"#\"><i class=\"fa fa-eye icon\"></i></a>\n                                    <a href=\"#\"><i class=\"fa fa-trash icon\"></i></a>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div> \n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], StatementList);
                return StatementList;
            }());
            exports_1("StatementList", StatementList);
        }
    }
});
//# sourceMappingURL=statement_list.js.map