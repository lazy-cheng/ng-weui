'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/');
                $stateProvider
                    .state('app', {
                        url: '/app',
                        template: '<div ui-view></div>'
                    })

                    //dialog
                    .state('app.dialog', {
                        url: '/dialog',
                        templateUrl: 'tpl/dialog.html',
                        controller: 'ctrl_dialog'
                    })

            }
        ]
    );