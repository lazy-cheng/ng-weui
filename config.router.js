'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          $urlRouterProvider
              .otherwise('/app');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'app/app.html'
              })
              //系统模块
              .state('app.sys', {
                  url: '/sys',
                  template: '<div ui-view></div>'
              })
              .state('app.sys.org', {
                  url: '/org',
                  templateUrl: 'app/org/org.html',
            	  controller: 'ctrl_org_manager',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('app/org/org.js');
                              }
                          );
                        }
                      ]
                  }
              })
      }
    ]
  );