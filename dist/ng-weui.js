/*!
 * ng-weui v0.1.0 (https://github.com/lazy-cheng/ng-weui)
 * Copyright 2016 lazycheng.com
 * Licensed under the MIT license
 */
(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['angular'], factory);
    } else {
        // Global Variables
        factory(root.angular);
    }
}(this, function (angular) {
    'use strict';
    var m = angular.module('ngWeui', []);
    var $el = angular.element;
    var isDef = angular.isDefined;
    var style = (document.body || document.documentElement).style;
    var forceBodyReload = false;
    var scopes = {};

    m.provider('ngWeui', function () {
        this.$get = ['$document', '$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout', '$window', '$controller', '$injector',
            function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout, $window, $controller, $injector) {
                var $body = $document.find('body');
                if (forceBodyReload) {
                    $rootScope.$on('$locationChangeSuccess', function () {
                        $body = $document.find('body');
                    });
                };
                var privateMethods = {
                    getArguments:function(e){
                        var params = [];
                        if(angular.isString(e)){
                            params =  e.match(/\S+/g);
                        };
                        return params;
                    },
                    destroy:function(e){
                        var as = this.getArguments(e);
                        for(var i=0;i<as.length;i++){
                            if (document.querySelector(as[i])){
                                document.querySelector(as[i]).remove();
                            };
                        };
                    },
                    ruleSelector:function(selector){
                        function uni(selector) {
                            if(selector!=null){
                                return selector.replace(/::/g, ':')
                            }
                        };
                        return Array.prototype.filter.call(
                            Array.prototype.concat.apply([],
                                Array.prototype.map.call(document.styleSheets, function(x) {
                                    return Array.prototype.slice.call(x.cssRules);
                                })), function(x) {
                                return uni(x.selectorText) === uni(selector);
                            });
                    }
                };


                var publicMethods = {
                    dialog:{
                        /*
                         * @param {Object} options:
                         * - title {String}
                         * - body {String}
                         * - scope {Object}
                         * - preSureCallback {Function}
                         * @return {Object} dialog
                         */
                        alert:function(opts){
                            if(angular.isString(opts)){
                                var as = privateMethods.getArguments(opts);
                                if(as.length == 2){
                                    opts = {title:as[0], body:as[1]};
                                }else{
                                    opts = {title:"提示", body:opts};
                                };
                            };
                            var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
                            scope.show = function(){
                                scope.dialogAlert = true;
                            };
                            scope.hide= function(){
                                if(angular.isFunction(opts.preSureCallback)){
                                    opts.preSureCallback();
                                }
                                scope.dialogAlert = false;
                            };
                            angular.extend(scope,opts);
                            privateMethods.destroy(".weui_dialog_alert");
                            $body.append($compile(
                                "<div class='weui_dialog_alert'  ng-show='dialogAlert'>" +
                                "<div class='weui_mask'></div>" +
                                "<div class='weui_dialog'>" +
                                "<div class='weui_dialog_hd'><strong class='weui_dialog_title'>{{title}}</strong></div>" +
                                "<div class='weui_dialog_bd'>{{body}}</div>" +
                                "<div class='weui_dialog_ft'>" +
                                "<a class='weui_btn_dialog primary' ng-click='hide()'>确定</a>" +
                                "</div>" +
                                "</div>" +
                                "</div>"
                            )(scope));
                            scope.show();
                        },
                        /*
                         * @param {Object} options:
                         * - title {String}
                         * - body {String}
                         * - scope {Object}
                         * - preSureCallback {Function}
                         * - preCancelCallback {Function}
                         * @return {Object} dialog
                         */
                        confirm:function(opts){
                            if(angular.isString(opts)){
                                var as = privateMethods.getArguments(opts);
                                if(as.length == 2){
                                    opts = {title:as[0], body:as[1]};
                                }else{
                                    opts = {title:"提示", body:opts};
                                };
                            };
                            var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
                            scope.show = function(){
                                scope.dialogConfirm = true;
                            };
                            scope.hide= function(){
                                if(angular.isFunction(opts.preCancelCallback)){
                                    opts.preCancelCallback();
                                }
                                scope.dialogConfirm = false;
                            };
                            scope.sure= function(){
                                if(angular.isFunction(opts.preSureCallback)){
                                    opts.preSureCallback();
                                }
                                scope.dialogConfirm = false;
                            };
                            angular.extend(scope,opts);
                            privateMethods.destroy(".weui_dialog_confirm");
                            $body.append($compile(
                                "<div class='weui_dialog_confirm'  ng-show='dialogConfirm'>" +
                                "<div class='weui_mask'></div>" +
                                "<div class='weui_dialog'>" +
                                "<div class='weui_dialog_hd'><strong class='weui_dialog_title'>{{title}}</strong></div>" +
                                "<div class='weui_dialog_bd'>{{body}}</div>" +
                                "<div class='weui_dialog_ft'>" +
                                "<a class='weui_btn_dialog default' ng-click='hide()'>取消</a>" +
                                "<a class='weui_btn_dialog primary' ng-click='sure()'>确定</a>" +
                                "</div>" +
                                "</div>" +
                                "</div>"
                            )(scope));
                            scope.show();
                        }
                    },
                    toast:{
                        /*
                         * @param {String} options: body type time
                         * @return {Object} dialog
                         */
                        show:function(opts){
                            if(angular.isString(opts)){
                                var as = privateMethods.getArguments(opts);
                                switch (as.length){
                                    case 3:
                                        opts = {body:as[0], type:as[1],time:parseInt(as[2])};
                                        break;
                                    case 2:
                                        opts = {body:as[0], type:as[1],time:2000};
                                        break;
                                    default:
                                        opts = {body:"已完成",time:2000};
                                        break;
                                }
                            }else{
                                opts = {body:"已完成",time:2000};
                            };

                            var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
                            scope.show = function(){
                                scope.toast = true;
                            };
                            scope.hide= function(){
                                scope.toast = false;
                            };
                            angular.extend(scope,opts);
                            privateMethods.destroy(".aweui-show #aweui-show");
                            switch (opts.type){
                                case "error":
                                    // \EA0D
                                    opts.type = "\\EA0D";
                                    break;
                                case "info":
                                    // \EA0C
                                    opts.type = "\\EA0C";
                                    break;
                                default:
                                    opts.type = "\\EA08";
                                    break;
                            };
                            $body.append($compile(
                                "<style id='aweui-show' type='text/css'>" +
                                ".weui_icon_toast:before {" +
                                "  content: '" + opts.type +
                                "' }" +
                                "</style>" +
                                "<div class='aweui-show'  ng-show='toast'>" +
                                "<div class='weui_mask_transparent'></div>" +
                                " <div class='weui_toast'>" +
                                "<i class='weui_icon_toast'></i>" +
                                "<p class='weui_toast_content'>{{body}}</p>" +
                                "</div>" +
                                "</div>"
                            )(scope));
                            scope.show();
                            $timeout(function(){
                                scope.hide();
                            },scope.time);
                        },
                        showLoading:function(opts){
                            if(angular.isString(opts)){
                                opts = {loadText:opts};
                            }else if(angular.isObject(opts)){
                                opts.loadText = opts.loadText || "数据加载中";
                            }else{
                                opts = {loadText:"数据加载中"};
                            };
                            var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
                            scope.show = function(){
                                scope.toast = true;
                            };
                            scope.hide= function(){
                                scope.toast = false;
                            };

                            angular.extend(scope,opts);
                            privateMethods.destroy(".weui_loading_toast");
                            switch (opts.type){
                                case "error":
                                    // \EA0D
                                    opts.type = "\\EA0D";
                                    break;
                                case "info":
                                    // \EA0C
                                    opts.type = "\\EA0C";
                                    break;
                                default:
                                    opts.type = "\\EA08";
                                    break;
                            };
                            $body.append($compile(
                                "<div class='weui_loading_toast aweui-show'>" +
                                " <div class='weui_mask_transparent'></div>" +
                                "  <div class='weui_toast'>" +
                                "<div class='weui_loading'>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_0'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_1'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_2'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_3'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_4'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_5'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_6'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_7'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_8'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_9'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_10'></div>" +
                                " <div class='weui_loading_leaf weui_loading_leaf_11'></div>" +
                                "</div>" +
                                " <p class='weui_toast_content'>{{loadText}}</p>" +
                                "</div>" +
                                "</div>"
                            )(scope));
                            return scope;
                        },
                        hideLoading:function(){
                            privateMethods.destroy(".weui_loading_toast");
                        }
                    }
                };
                return publicMethods;
            }];
    });

    m.directive('currentPosition', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            scope: {
                styleClass:"@"
            },
            template:'<div class="cp-box {{styleClass}}">'+
            ' <div class="cp-body" style="padding: 0 1em;">'+
            ' <div class="cp-title" style="float:left;">'+
            ' 当前位置：'+
            ' </div>'+
            '<div class="cp-address" style="float:left;">{{address}} </div>'+
            '<div style="clear: both;"></div>'+
            '</div>'+
            '</div>',
            link: function (scope, elem, attrs) {
                scope.address= "";
                scope.getAddress = function(){
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(pos) {
                            var convertor = new BMap.Convertor();
                            convertor.translate([new BMap.Point(pos.coords.longitude, pos.coords.latitude)], 1, 5, function(data){
                                if(data.status === 0) {
                                    var geoc = new BMap.Geocoder();
                                    geoc.getLocation(data.points[0], function(rs){
                                        var addComp = rs.addressComponents;
                                        var address = addComp.province + " "
                                            + addComp.city + " "
                                            + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
                                        address =  $.trim(address);
                                        scope.address = address;
                                        //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                                        scope.$apply();
                                    });
                                }
                            })
                        }, function(err) {
                            scope.address= "无法使用定位功能";
                            scope.$apply();
                            // https://developer.mozilla.org/cn/docs/Web/API/PositionError 错误参数
                        }, {
                            enableHighAccuracy: true, // 是否获取高精度结果
                            timeout: 5000, //超时,毫秒
                            maximumAge: 0 //可以接受多少毫秒的缓存位置
                            // 详细说明 https://developer.mozilla.org/cn/docs/Web/API/PositionOptions
                        });
                    } else {
                        scope.address= "无法使用定位功能";
                    }
                };
                scope.getAddress();
            }
        };
    }]);
    return m;
}));
