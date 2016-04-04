'use strict';

//appCtrl
app.controller('appCtrl', ['$scope', function($scope) {




}]);



//dialogCtrl
app.controller('dialogCtrl', ['$scope','ngWeui', function($scope,ngWeui) {

    $scope.showDialog1 = function(){
        ngWeui.dialog.alert("11");
    };
}]);