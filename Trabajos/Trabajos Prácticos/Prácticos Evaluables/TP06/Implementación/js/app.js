var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope) {

    $scope.momentoEntrega = "" // 'A' lo antes posible, 'P' hora programada
    $scope.metodoPago = "" // 'T' tarjeta de credito, 'E' efectivo
    $scope.cargarImagen = function () {
        if (window.FileReader) {
            document.getElementById('upload-photo').addEventListener('change', handleFileSelect, false);
            function handleFileSelect(evt) {
                var files = evt.target.files;
                var f = files[0];
                var reader = new FileReader();

                reader.onload = (function (theFile) {
                    return function (e) {
                        document.getElementById('list').innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="300" />'].join('');
                    };
                })(f);

                reader.readAsDataURL(f);
            }

        } else {
            alert('This browser does not support FileReader');
        }
    }
    $scope.cargarImagen();
});