var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {

  $scope.momentoEntrega = "A" // 'A' lo antes posible, 'P' hora programada
  $scope.metodoPago = "" // 'T' tarjeta de credito, 'E' efectivo

});
