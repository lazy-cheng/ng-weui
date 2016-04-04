'use strict';

/**
 * Config for the router
 */
app.run(
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
                        abstract: true,
                        url: '/app',
                        templateUrl: 'example/tpl/app.html'
                    })

                    //dialog
                    .state('app.dialog', {
                        url: '/dialog',
                        templateUrl: 'example/tpl/dialog.html',
                        controller: 'dialogCtrl'
                    })

                    //dialog
                    .state('app.toast', {
                        url: '/toast',
                        templateUrl: 'example/tpl/toast.html',
                        controller: 'toastCtrl'
                    })

            }
        ]
    );