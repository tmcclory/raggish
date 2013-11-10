'use strict';

angular.module('autoragApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).
    filter('range', function() {
    return function(input,total) {
      var i=0;
      total = parseInt(total,10);
      for ( i=0; i<total; i+=1) {
        input.push(i);
      } 
      return input;
    };
  });
