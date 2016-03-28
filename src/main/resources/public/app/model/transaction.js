System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PaymentType;
    return {
        setters:[],
        execute: function() {
            (function (PaymentType) {
                PaymentType[PaymentType["DEBIT"] = 1] = "DEBIT";
                PaymentType[PaymentType["CREDIT"] = 2] = "CREDIT";
            })(PaymentType || (PaymentType = {}));
            exports_1("PaymentType", PaymentType);
        }
    }
});
//# sourceMappingURL=transaction.js.map