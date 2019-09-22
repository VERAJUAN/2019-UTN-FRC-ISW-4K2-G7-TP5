var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope,$http) {

  $scope.momentoEntrega = "" // 'A' lo antes posible, 'P' hora programada
  $scope.metodoPago = "" // 'T' tarjeta de credito, 'E' efectivo

  $scope.obtenerCoordenadasComercio = function () {
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
      + $scope.alturaComercio + '+'
      + $scope.calleComercio + ',+'
      + $scope.ciudadComercio +
      ',+cordoba'+
      '&key=AIzaSyDWm21zrmC4NZfNez65rFSmHrugggF5rAY')

      .then(function (respuesta) {
          console.log(respuesta.data.results[0].geometry.location)
      })
  }

  $scope.obtenerDireccionComercio = function () {
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
      + $scope.alturaComercio + '+'
      + $scope.calleComercio + ',+'
      + $scope.ciudadComercio +
      ',+cordoba'+
      '&key=AIzaSyDWm21zrmC4NZfNez65rFSmHrugggF5rAY')

      .then(function (respuesta) {
          console.log(respuesta.data.results[0].geometry.location)
      })
  }





});
