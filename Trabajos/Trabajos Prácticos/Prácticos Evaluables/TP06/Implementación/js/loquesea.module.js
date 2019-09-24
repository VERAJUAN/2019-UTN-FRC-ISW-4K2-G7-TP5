angular
      .module("LoQueSeaModule", [])
      .controller("LoQueSeaController", LoQueSeaController);

function LoQueSeaController($scope,$http){
    $scope.marker = null;
    $scope.momentoEntrega = ""; // 'A' lo antes posible, 'P' hora programada
    $scope.metodoPago = ""; // 'T' tarjeta de credito, 'E' efectivo
	$scope.pagoElegido = 'N'; // metodo de pago elegido 'S' si 'N' no
	$scope.momentoEntregaElegido = 'N'; // momento de Entrega Elegido 'S' si 'N' no
    $scope.localidades = ['Córdoba','Villa Carlos Paz','Río Cuarto'];
    $scope.locSelectedComercio = 'Córdoba';
    $scope.locSelectedEntrega = 'Córdoba';
    $scope.reverseGeocoding = true;
    $scope.lat = -31.42008329999999;
    $scope.lng = -64.1887761;

    $scope.obtenerCoordenadasComercio = obtenerCoordenadasComercio;
    $scope.obtenerDireccionComercio = obtenerDireccionComercio;
    $scope.myMap = myMap;
    $scope.placeMarker = placeMarker;
    $scope.cargarImagen = cargarImagen;
    $scope.enviarPedido = enviarPedido;
    $scope.pedidoEnviado = false;

    $scope.myMap();
    $scope.cargarImagen();


    function obtenerCoordenadasComercio() {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
        + $scope.alturaComercio + '+'
        + $scope.calleComercio + ',+'
        + $scope.ciudadComercio +
        ',+cordoba'+
        '&key=YOURAPIKEY')

        .then(function (respuesta) {
            $scope.lat = respuesta.data.results[0].geometry.location.lat;
            $scope.lng = respuesta.data.results[0].geometry.location.lng;
            $scope.reverseGeocoding = false;
            $scope.myMap();
        })
    }

    function obtenerDireccionComercio() {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + $scope.lat + ','
        + $scope.lng + '+'
        + '&key=YOURAPIKEY')

        .then(function (respuesta) {
          if (respuesta.data.results[0].address_components[0].types[0] == "street_number") {
            $scope.alturaComercio = respuesta.data.results[0].address_components[0].long_name;
          }else {
            $scope.alturaComercio = "";
          }

          if (respuesta.data.results[0].address_components[1].types[0] == "route") {
            $scope.calleComercio = respuesta.data.results[0].address_components[1].long_name;
          }else{
            $scope.calleComercio = "";
          }

          if(respuesta.data.results[0].address_components[3].types[0] == "locality"){
                $scope.locSelectedComercio = respuesta.data.results[0].address_components[3].long_name;
          }else if (respuesta.data.results[0].address_components[2].types[0] == "locality") {
            $scope.locSelectedComercio = respuesta.data.results[0].address_components[2].long_name;
          }
        })
    }

    function myMap(){
      var mapProp = {
        center: new google.maps.LatLng($scope.lat, $scope.lng),
        zoom: 17,
      };

      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

      google.maps.event.addListener(map, 'click', function (event) {
        $scope.placeMarker(map, event.latLng);
        console.log($scope.reverseGeocoding);
      });

      if($scope.reverseGeocoding == false){
        $scope.marker = null;
        $scope.latLng = {'lat':$scope.lat, 'lng':$scope.lng};
        console.log($scope.latLng);
        $scope.placeMarker(map, $scope.latLng);
      }
    }

    function placeMarker(map, location) {
      if ($scope.marker == null) {
        $scope.marker = new google.maps.Marker({
          position: location,
          map: map
        });

        if ($scope.reverseGeocoding == true) {
          $scope.lat = location.lat();
          $scope.lng = location.lng();
          $scope.obtenerDireccionComercio();
        }else {
          $scope.reverseGeocoding = true;
        }
      }else {
        $scope.marker.setPosition(location);
        if ($scope.reverseGeocoding == true) {
          $scope.lat = location.lat();
          $scope.lng = location.lng();
          $scope.obtenerDireccionComercio();
        }else {
          $scope.reverseGeocoding = true;
        }
      }
    }

    function cargarImagen() {
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

    function enviarPedido() {
      $scope.pedidoEnviado = true;
        alert("Pedido enviado");
    }

};
