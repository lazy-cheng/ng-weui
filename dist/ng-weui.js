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
    var openIdStack = [];

    m.provider('ngWeui', function () {
        this.$get = ['$document', '$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout', '$window', '$controller', '$injector',
            function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout, $window, $controller, $injector) {
                var $body = $document.find('body');

                if (forceBodyReload) {
                    $rootScope.$on('$locationChangeSuccess', function () {
                        $body = $document.find('body');
                    });
                }

                var privateMethods = {
                };

                var publicMethods = {

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
