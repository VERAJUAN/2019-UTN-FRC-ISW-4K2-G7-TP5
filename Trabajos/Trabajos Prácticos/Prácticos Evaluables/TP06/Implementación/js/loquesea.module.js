angular
      .module("LoQueSeaModule", [])
      .controller("LoQueSeaController", LoQueSeaController);

function LoQueSeaController($scope,$http){
    this.marker = null;
    this.momentoEntrega = ""; // 'A' lo antes posible, 'P' hora programada
    this.metodoPago = ""; // 'T' tarjeta de credito, 'E' efectivo
    $scope.localidades = ['Córdoba','Villa Carlos Paz','Río Cuarto'];
    $scope.locSelectedComercio = 'Córdoba';
    $scope.locSelectedEntrega = 'Córdoba';
    this.reverseGeocoding = true;
    this.lat = -31.42008329999999;
    this.lng = -64.1887761;

    this.obtenerCoordenadasComercio = obtenerCoordenadasComercio;
    this.obtenerDireccionComercio = obtenerDireccionComercio;
    this.myMap = myMap;
    this.placeMarker = placeMarker;
    this.cargarImagen = cargarImagen;
    this.enviarPedido = enviarPedido;

    this.myMap();
    this.cargarImagen();


    function obtenerCoordenadasComercio() {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
        + this.alturaComercio + '+'
        + this.calleComercio + ',+'
        + this.ciudadComercio +
        ',+cordoba'+
        '&key=YOURAPIKEY')

        .then(function (respuesta) {
            this.lat = respuesta.data.results[0].geometry.location.lat;
            this.lng = respuesta.data.results[0].geometry.location.lng;
            this.reverseGeocoding = false;
            this.myMap();
        })
    }

    function obtenerDireccionComercio() {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + this.lat + ','
        + this.lng + '+'
        + '&key=YOURAPIKEY')

        .then(function (respuesta) {
          if (respuesta.data.results[0].address_components[0].types[0] == "street_number") {
            this.alturaComercio = respuesta.data.results[0].address_components[0].long_name;
          }else {
            this.alturaComercio = "";
          }

          if (respuesta.data.results[0].address_components[1].types[0] == "route") {
            this.calleComercio = respuesta.data.results[0].address_components[1].long_name;
          }else{
            this.calleComercio = "";
          }

          if(respuesta.data.results[0].address_components[3].types[0] == "locality"){
                this.locSelectedComercio = respuesta.data.results[0].address_components[3].long_name;
          }else if (respuesta.data.results[0].address_components[2].types[0] == "locality") {
            this.locSelectedComercio = respuesta.data.results[0].address_components[2].long_name;
          }
        })
    }

    function myMap(){
      var mapProp = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: 17,
      };

      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

      google.maps.event.addListener(map, 'click', function (event) {
        this.placeMarker(map, event.latLng);
        console.log(this.reverseGeocoding);
      });

      if(this.reverseGeocoding == false){
        this.marker = null;
        this.latLng = {'lat':this.lat, 'lng':this.lng};
        console.log(this.latLng);
        this.placeMarker(map, this.latLng);
      }
    }

    function placeMarker(map, location) {
      if (this.marker == null) {
        this.marker = new google.maps.Marker({
          position: location,
          map: map
        });

        if (this.reverseGeocoding == true) {
          this.lat = location.lat();
          this.lng = location.lng();
          this.obtenerDireccionComercio();
        }else {
          this.reverseGeocoding = true;
        }
      }else {
        this.marker.setPosition(location);
        if (this.reverseGeocoding == true) {
          this.lat = location.lat();
          this.lng = location.lng();
          this.obtenerDireccionComercio();
        }else {
          this.reverseGeocoding = true;
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
        console.log("asdasd");
    }

};
