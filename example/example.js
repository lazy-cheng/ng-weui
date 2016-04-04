'use strict';

//appCtrl
app.controller('appCtrl', ['$scope', function($scope) {




}]);



//dialogCtrl
app.controller('dialogCtrl', ['$scope','ngWeui', function($scope,ngWeui) {
    //alert
    $scope.showDialog1 = function(){
        ngWeui.dialog.alert("我是标题 我是内容");
    };
    //confirm
    $scope.showDialog2 = function(){
        ngWeui.dialog.confirm({
            title:"提示",
            body:"你确定do something...?",
            preSureCallback:function(){
                alert("确定...todo");
            }
        });
    };
}]);