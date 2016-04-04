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
                    },
                    destroy:function(e){
                        if (document.querySelector(e)){
                            document.querySelector(e).remove();
                        };
                    },
                    ruleSelector:function(selector){
                        function uni(selector) {
                            return selector.replace(/::/g, ':')
                        };

                        return Array.prototype.filter.call(Array.prototype.concat.apply([], Array.prototype.map.call(document.styleSheets, function(x) {
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
                            privateMethods.destroy(".aweui-show");
                            $body.append($compile(
                                "<div class='aweui-show'  ng-show='toast'>" +
                                "<div class='weui_mask_transparent'></div>" +
                                " <div class='weui_toast'>" +
                                "<i class='weui_icon_toast'></i>" +
                                "<p class='weui_toast_content'>{{body}}</p>" +
                                "</div>" +
                                "</div>"
                            )(scope));

                            var pseudo = privateMethods.ruleSelector(".weui_icon_toast:before").slice(-1);
                            debugger
                            switch (opts.type){
                                case "error":
                                    // \EA0D
                                    opts.type = "\EA0D";
                                    break;
                                case "info":
                                    // \EA0C
                                    opts.type = "\EA0C";
                                    break;
                                default:
                                    opts.type = "\EA08";
                                    break;
                            }
                            pseudo.forEach(function(rule) {
                                debugger
                                rule.style.content = opts.type;
                            });
                            scope.show();
                            $timeout(function(){
                                scope.hide();
                            },scope.time);
                        }
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
