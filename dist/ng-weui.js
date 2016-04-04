/*!
 * ng-weui v0.1.0 (https://github.com/lazy-cheng/ng-weui)
 * Copyright 2016 Tencent, Inc.
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
                            if (document.querySelector(".weui_dialog_alert")){
                                document.querySelector(".weui_dialog_alert").remove();
                            };
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
                            if (document.querySelector(".weui_dialog_confirm")){
                                document.querySelector(".weui_dialog_confirm").remove();
                            };
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

                    }
                };
                return publicMethods;
            }];
    });

    m.directive('ngWeui', ['ngWeui', function (ngWeui) {
        return {
            restrict: 'A',
            scope: {
                ngWeuiScope: '='
            },
            link: function (scope, elem, attrs) {
                elem.on('click', function (e) {
                    e.preventDefault();

                    var ngWeuiScope = angular.isDefined(scope.ngWeuiScope) ? scope.ngWeuiScope : 'noScope';
                    angular.isDefined(attrs.ngDialogClosePrevious) && ngDialog.close(attrs.ngDialogClosePrevious);

                });
            }
        };
    }]);

    return m;
}));
