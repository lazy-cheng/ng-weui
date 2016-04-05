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

//toastCtrl
app.controller('toastCtrl', ['$scope','ngWeui','$timeout', function($scope,ngWeui,$timeout) {
    //toast
    $scope.showToast = function(e){
        switch (e){
            case 0:
                //success
                ngWeui.toast.show();
                break;
            case 1:
                //info
                ngWeui.toast.show("信息 info 3000");
                break;
            case 2:
                //errot
                ngWeui.toast.show("错误 error 2000");
                break;
        }
    };

    //toast loading
    $scope.showLoadingToast = function(){
        //default
        ngWeui.toast.showLoading();
        //ngWeui.toast.showLoading("加载中...");
        $timeout(function(){
            ngWeui.toast.hideLoading();
        },3000);
    };

}]);