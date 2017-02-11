var items = [];
var id = 0;

function initialize() {

  var styleArray = [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(-34.609476, -58.425979),
    styles: styleArray
  };

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      icon: iconBase + 'library_maps.png'
    },
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };    

  var map = new google.maps.Map(document.getElementById('map'),mapOptions);
  var markers = [];
  var infowindows = [];
    
	for (var j in dataJSON){

      var reputacion = dataJSON[j].reputacion.charAt(0);
      var estrellas = spanEstrellas(reputacion);

      var precio = dataJSON[j].valorPlatoMax.substring(1);
      precio = parseInt(precio);
      var  dolares = spanDolares(precio);

      var contentString = '<div id="iw-container">' +
                            '<div class="iw-title">' + dataJSON[j].nombre + '</div>' +
                            '<div class="iw-content">' +
                              '<div class="iw-subTitle">Descripcion</div>' +
                              '<img src="images/' + dataJSON[j].imagen + '" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
                              '<p>' + dataJSON[j].descripcion + '</p>' +
                              '<div class="iw-subTitle">Reputacion</div>' +
                               estrellas +  
                              '<div class="iw-subTitle">Precio</div>' +
                               dolares +  
                              '<div class="iw-subTitle">Contacto</div>' +
                              '<p>' + dataJSON[j].direccion + 
                              '<br> url: ' + 
                              '<a href="' + dataJSON[j].link + '">' + dataJSON[j].link + '</a></p>'+
                            '</div>' +
                            '<div class="iw-bottom-gradient"></div>' +
                          '</div>';

    	infowindows[j] = new google.maps.InfoWindow({
        	content: contentString,
          maxWidth: 350
      });

    	var latitud = parseFloat(dataJSON[j].position.lat);
    	var longitud = parseFloat(dataJSON[j].position.lng);

    	markers[j] = new google.maps.Marker({
        position: {lat: latitud, lng: longitud},
        title:dataJSON[j].nombre,
//        icon: icons[feature.type].icon
          icon: "https://www.ashburnhampizza.com/wp-content/themes/steweys/images/favicon.ico"
      });
      markers[j].index = j;

    	markers[j].addListener('click', function() {
        infowindows[this.index].open(map,markers[this.index]);
        map.panTo(markers[this.index].getPosition());
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();
        iwBackground.children(':nth-child(2)').css({'display' : 'none'});
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});
        iwOuter.parent().parent().css({left: '115px'});
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
        var iwCloseBtn = iwOuter.next();
         iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

        if($('.iw-content').height() < 140){
           $('.iw-bottom-gradient').css({display: 'none'});
        }

       iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
       });
  	 });

	    markers[j].setMap(map);
	}

	var items = localStorage.getItem("lsItems");
	var json_items = JSON.parse(items);
	var markerLocalStorage = [];
  var infowindowsi = [];

	for (var i in json_items){

      var reputacion = json_items[i].reputacion.charAt(0);
      var estrellas = spanEstrellas(reputacion);

      var precio = json_items[i].valorPlatoMax.substring(1);
      precio = parseInt(precio);
      var  dolares = spanDolares(precio);

  	  var contentString = '<div id="iw-container">' +
                          '<div class="iw-title">' + json_items[i].nombre + '</div>' +
                          '<div class="iw-content">' +
                           '<div class="iw-subTitle">Descripcion</div>' +
                           '<img src="images/' + json_items[i].imagen + '" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
                           '<p>' + json_items[i].descripcion + '</p>' +
                           '<div class="iw-subTitle">Reputacion</div>' +
                            estrellas +  
                           '<div class="iw-subTitle">Precio</div>' +
                            dolares +  
                           '<div class="iw-subTitle">Contacto</div>' +
                             '<p>' + json_items[i].direccion + 
                             '<br> url: ' + 
                             '<a href="' + json_items[i].link + '">' + json_items[i].link + '</a></p>'+
                           '</div>' +
                           '<div class="iw-bottom-gradient"></div>' +
                          '</div>';

    	infowindowsi[i] = new google.maps.InfoWindow({
        	content: contentString,
          maxWidth: 350
      });

    	var latitud = parseFloat(json_items[i].position.lat);
    	var longitud = parseFloat(json_items[i].position.long);
    
    	markerLocalStorage[i] = new google.maps.Marker({
        position: {lat: latitud, lng: longitud},
        title:json_items[i].nombre,
        icon: "https://www.ashburnhampizza.com/wp-content/themes/steweys/images/favicon.ico"
      });
      markerLocalStorage[i].index = i;

    	markerLocalStorage[i].addListener('click', function() {
     	   infowindowsi[this.index].open(map, markerLocalStorage[this.index]);
         map.panTo(markerLocalStorage[this.index].getPosition());
         var iwOuter = $('.gm-style-iw');
         var iwBackground = iwOuter.prev();
         iwBackground.children(':nth-child(2)').css({'display' : 'none'});
         iwBackground.children(':nth-child(4)').css({'display' : 'none'});
         iwOuter.parent().parent().css({left: '115px'});
         iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
         iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
         iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
         var iwCloseBtn = iwOuter.next();
         iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

         if($('.iw-content').height() < 140){
            $('.iw-bottom-gradient').css({display: 'none'});
         }

        iwCloseBtn.mouseout(function(){
           $(this).css({opacity: '1'});
        });
  		});
	    markerLocalStorage[i].setMap(map);
	}
}

function spanEstrellas(reputacion){
  var estrella = '<span id="close" class="glyphicon glyphicon-star-empty"></span>';
  switch(reputacion) {
    case "1" :
      var estrellas = estrella; 
      break; 
    case "2" :
      var estrellas = estrella + estrella; 
      break; 
    case "3" :
      var estrellas = estrella + estrella + estrella; 
      break; 
    case "4" :
      var estrellas = estrella + estrella + estrella + estrella;  
      break; 
    case "5" :
      var estrellas = estrella + estrella + estrella + estrella + estrella; 
    break; 
  }
  return estrellas; 
}

function spanDolares(precio){
  var dolar  = '<span id="close" class="glyphicon glyphicon-usd"></span>';

  if (precio < 100){
    var dolares = dolar;
  } else if (precio <= 200){
    dolares = dolar + dolar;
  } else{
    dolares = dolar + dolar + dolar;
  }
  return dolares;
}

google.maps.event.addDomListener(window, 'load', initialize);
  var dataJSON = {};
  var restaurantes = [];
  var eventsholded = {};

  $.getJSON("map.json")
      .done(function( data, textStatus, jqXHR ) {
              dataJSON = data.mapa.items;
              for( i in dataJSON){
                console.log(dataJSON[i].descripcion);
              }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
         console.log( "Algo ha fallado: " +  textStatus );
  });

function itemMapa(id,position,nombre,direccion,descripcion,valorPlatoMax,reputacion,link,imagen){
	this.id = id;
	this.position = position;
	this.nombre = nombre;
	this.direccion = direccion;
	this.descripcion = descripcion;
	this.valorPlatoMax = valorPlatoMax;
	this.reputacion = reputacion;
	this.link = link;
	this.imagen = imagen;
};

$("#registrar").click(function(){
  var nombre        = $("#nombre").val();
  var latitud       = $("#latitud").val();
  var longitud      = $("#longitud").val();
  var direccion     = $("#direccion").val();
  
  var position = {
    lat : latitud,
    long : longitud
  }
  
  var descripcion   = $("#descripcion").val();
  var valorPlatoMax = $("#valorPlatoMax").val();
  var reputacion    = $("#reputacion").val();
  var link          = $("#link").val(); 
  var imagen          = $("#imagen").val().split('\\').pop();
  var item = new itemMapa(id,position,nombre,direccion,descripcion,valorPlatoMax,reputacion,link,imagen);
	items.push(item);
  id++;
  
  localStorage.setItem("lsItems",JSON.stringify(items)); 
});

$("#close").click(function() {
  $("#close").parent().animate({
      opacity: 0.25,
       left: "+=0",
       height: "toggle"
  }, 200, function() {
    $('.rightarrow').show();
  });
});

$("#abrir").click(function() {
  $("#close" ).parent().animate({
      opacity: 1,
       left: "+=0",
       height: "toggle"
  }, 200, function() {
    $('.rightarrow').hide();
  });
});

google.maps.event.addListener(map, "click", function (event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log( latitude + ', ' + longitude );

    $("#latitud").text(latitude);
    $("#longitud").text(longitude);
}); 
