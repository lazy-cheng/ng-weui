'use strict';

angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad'
]).run(function($rootScope,$state,$http,$stateParams,$cookieStore,ajax){

  	$rootScope.z$imageUrl = "http://zzb.xfzbgl.com.cn:8898";

  	window._alert = function(text,type,title){
		type = type||"success";
		title = title||"";
		swal({
			title: title,
			text: text,
			type : type,
			timer: 1000,
			showConfirmButton: false 
		});
	};
	
	window._confirm = function(title,fn,type,text){
		type = type||"info";
		title = title||"";
		text = text||"";
		swal({
			title : title,
			text : text,
			type : type,
			showCancelButton : true,
			closeOnConfirm : false,
			showLoaderOnConfirm : true,
			confirmButtonText:"确定",
			cancelButtonText:"取消"
		},
		function(){
			if(angular.isFunction(fn)) fn();
		});
	};
	
});