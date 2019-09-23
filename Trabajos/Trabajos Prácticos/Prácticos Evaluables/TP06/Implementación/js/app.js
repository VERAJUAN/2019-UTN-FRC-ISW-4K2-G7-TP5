var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope,$http) {

    $scope.marker = null;
    $scope.momentoEntrega = "" // 'A' lo antes posible, 'P' hora programada
    $scope.metodoPago = "" // 'T' tarjeta de credito, 'E' efectivo
    $scope.localidades = ['Córdoba','Villa Carlos Paz','Río Cuarto'];
    $scope.locSelectedComercio = 'Córdoba';
    $scope.locSelectedEntrega = 'Córdoba';


    $scope.obtenerCoordenadasComercio = function () {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
        + $scope.alturaComercio + '+'
        + $scope.calleComercio + ',+'
        + $scope.ciudadComercio +
        ',+cordoba'+
        '&key=AIzaSyDWm21zrmC4NZfNez65rFSmHrugggF5rAY')

        .then(function (respuesta) {
            $scope.lat = respuesta.data.results[0].geometry.location.lat;
            $scope.lng = respuesta.data.results[0].geometry.location.lng;
        })
    }

    $scope.obtenerDireccionComercio = function () {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + $scope.lat + ','
        + $scope.lng + '+'
        + '&key=AIzaSyDWm21zrmC4NZfNez65rFSmHrugggF5rAY')
        .then(function (respuesta) {
          if (respuesta.data.results[0].address_components[0].types[0] == "street_number") {
            $scope.alturaComercio = respuesta.data.results[0].address_components[0].long_name
          }else {
            $scope.alturaComercio = "";
          }

          if (respuesta.data.results[0].address_components[1].types[0] == "route") {
            $scope.calleComercio = respuesta.data.results[0].address_components[1].long_name
          }else{
            $scope.calleComercio = "";
          }

          if(respuesta.data.results[0].address_components[3].types[0] == "locality"){
                $scope.locSelectedComercio = respuesta.data.results[0].address_components[3].long_name
          }else if (respuesta.data.results[0].address_components[2].types[0] == "locality") {
            $scope.locSelectedComercio = respuesta.data.results[0].address_components[2].long_name
          }


            console.log($scope.locSelectedComercio)
            console.log(respuesta.data)
        })
    }

    $scope.myMap = function(){
      var mapProp = {
        center: new google.maps.LatLng(-31.42008329999999, -64.1887761),
        zoom: 17,
      };
      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

      google.maps.event.addListener(map, 'click', function (event) {
        $scope.placeMarker(map, event.latLng);
      });

    }

    $scope.placeMarker = function (map, location) {
      if ($scope.marker == null) {
        $scope.marker = new google.maps.Marker({
          position: location,
          map: map
        });

        $scope.lat = location.lat()
        $scope.lng = location.lng()
        $scope.obtenerDireccionComercio()


      }
      else {
        $scope.marker.setPosition(location);
        $scope.lat = location.lat()
        $scope.lng = location.lng()
        $scope.obtenerDireccionComercio()

      }
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
                        document.getElementById('contImg').innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" height="160px" />'].join('');
                    };
                })(f);

                reader.readAsDataURL(f);
            }

        } else {
            alert('This browser does not support FileReader');
        }
    }






    $scope.enviarPedido = function () {
        window.alert("formulario enviado");
    }



    $scope.myMap()
    $scope.cargarImagen();

});
