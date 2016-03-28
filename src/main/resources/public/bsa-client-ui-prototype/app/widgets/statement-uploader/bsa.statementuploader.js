(function(){
    'use strict';
    
    angular
        .module('app')
        .directive('bsaStatementUploader', statementUploader);
    
    
    function statementUploader() {

        var directive = {
            link: link,
            templateUrl: "app/widgets/statement-uploader/bsa.statementuploader.html"
        };
        
        return directive;
        
        function link(scope, element, attrs) {
            
        }
    }
    
})();