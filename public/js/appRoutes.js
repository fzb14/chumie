angular.module('appRoutes', []).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'index.html',
            controller: 'MainController as mainCtrl'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashBoard.html'
        })

        .state('nerds', {
            url: '/nerds',
            templateUrl: 'views/nerd.html',
            controller: 'NerdController as nerdCtrl'
        })

        .state('geeks', {
            url: '/geeks',
            templateUrl: 'views/geek.html',
            controller: 'GeekController as geekCtrl'
        });
});