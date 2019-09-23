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

    $scope.cargarImagen = function () {
        if (window.FileReader) {
            document.getElementById('upload-photo').addEventListener('change', handleFileSelect, false);
            function handleFileSelect(evt) {
                var files = evt.target.files;
                var f = files[0];
                var reader = new FileReader();

                reader.onload = (function (theFile) {
                    return function (e) {
                        document.getElementById('contImg').innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="100px" />'].join('');
                    };
                })(f);

                reader.readAsDataURL(f);
            }

        } else {
            alert('This browser does not support FileReader');
        }
    }
    $scope.cargarImagen();

    $scope.enviarPedido = function () {
        window.alert("formulario enviado");
    }

});
