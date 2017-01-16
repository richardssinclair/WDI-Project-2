const App    = App || {};
const google = google;

//makes the app, runs the functions in the authenticatons form
App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.home').on('click', this.homepage.bind(this));
  this.$main.on('submit', 'form', this.handleForm);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

//info window for markers displays infotmation image,name,discription,location
App.addInfoWindowForPub = function(pub, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infowindow !== 'undefined') this.infowindow.close();
    this.infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
      <img class="pubImage" src="${ pub.image }">
      <h3> ${pub.name } </h3>
      <p> ${ pub.description } </p>
      <p> ${ pub.location } </p>
      </div>`,
      maxWidth: 300
    });
    this.infowindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
  });
};

App.getCurrentLocation = function() {
  navigator.geolocation.getCurrentPosition(position => {
    App.currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    const icon = {
      url: 'images/dot.png',
      scaledSize: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
      // GeoMarker: new GeolocationMarker(canvas)
    };

    new google.maps.Marker({
      position: App.currentLocation,
      map: App.map,
      animation: google.maps.Animation.DROP,
      icon
    });
    App.map.panTo(App.currentLocation);
  });

  //whats going on here?? calling stuff?
  App.ajaxRequest('http://localhost:3000/api/pubs', 'GET');
};

App.loopThroughPubs = function(pubs) {
  $.each(pubs.pubs, (index, pub) => {
    setTimeout(() => {
      App.createMarkerForPub(pub);
    }, index * 200);
  });
};
//// creating the markers for pubs
App.createMarkerForPub = function(pub) {
  const latlng = new google.maps.LatLng(pub.lat, pub.lng);

  const beerIcon = {
    url: 'images/beer.png',
    scaledSize: new google.maps.Size(40, 55),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };

  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    animation: google.maps.Animation.DROP,
    icon: beerIcon
  });

  this.addInfoWindowForPub(pub, marker);
};

//adding a pub ajax request.. a little confused..i dont think this is working..
App.addPub = function(){
  event.preventDefault();
  $.ajax({
    method: 'POST',
    data: $(this).serialize()
  }).done(data => {
    console.log(data.pub);
    App.createMarkerForPub(null, data.pub);
    $('form').reset().hide();
  });
};

App.getPubs = function() {
  App.ajaxRequest('http://localhost:3000/api/pubs', 'GET', null, App.loopThroughPubs);
};

App.createMap = function(){
  const canvas = document.getElementById('canvas');
  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.5203643, -0.1089372),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        'featureType': 'administrative',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#444444'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#dee2d1'
          },
          {
            'lightness': '100'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [
          {
            'saturation': -100
          },
          {
            'lightness': 45
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#ff4b5f'
          },
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#ff4b5f'
          },
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#ff4b5f'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#ff4b5f'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#46c8fa'
          },
          {
            'visibility': 'on'
          }
        ]
      }
    ]
  };
  App.map = new google.maps.Map(canvas, mapOptions);
  this.getCurrentLocation(),
  App.getPubs();
  ////
  // this.directionsDisplay.setMap();
  //////////

  new AutocompleteDirectionsHandler(App.map);
};

App.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.$main.html(`
    <input id="origin-input" class="controls" type="text"
    placeholder="Enter an origin location">

    <input id="destination-input" class="controls" type="text"
    placeholder="Enter a destination location">
    
    </div>
    <div id="canvas"></div>
    `);
    this.createMap();
  };

  App.loggedOutState = function(){
    $('.loggedIn').hide();
    $('.loggedOut').show();
    this.register();
  };

  //register finction, displays register inputs so users gan register
  App.register = function(e){
    if (e) e.preventDefault();
    this.$main.html(`
      <form method="post" action="/register">
      <div class="navbar">
      <div class="modal-content">
      <div class="modal-header">
      <h1 class="text-center">Welcome</h1>
      </div>
      <div class="form-group">
      <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
      <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="btn btn-primary" type="submit" value="Register">
      </div>
      </div>
      </div>
      </form>
      `);
    };

    // //
    //     <form method="post" action="/register">
    //       <div class="form-group">
    //         <input class="form-control" type="text" name="user[username]" placeholder="Username">
    //       </div>
    //       <div class="form-group">
    //         <input class="form-control" type="email" name="user[email]" placeholder="Email">
    //       </div>
    //       <div class="form-group">
    //         <input class="form-control" type="password" name="user[password]" placeholder="Password">
    //       </div>
    //       <div class="form-group">
    //         <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
    //       </div>
    //       <input class="btn btn-primary" type="submit" value="Register">
    //     </form>
    //
    // /////////////

    //login function so users can log in to the map
    App.login = function(e) {
      e.preventDefault();
      this.$main.html(`
        <form method="post" action="/login">
        <div class="navbar">
        <div class="modal-content">
        <div class="modal-header">
        <h1 class="text-center">Welcome</h1>
        </div>
        <div class="modal-body">
        <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
        <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <div class="form-group">
        <input class="btn btn-primary" type="submit" value="Login">
        </div>
        </div>
        </div>
        </div>
        </form>
        `);
      };

      App.logout = function(e){
        e.preventDefault();
        this.removeToken();
        this.loggedOutState();
      };

      App.homepage = function(){
        console.log('shabba!');
      };

      App.handleForm = function(e){
        console.log('running');
        e.preventDefault();
        const url    = `${App.apiUrl}${$(this).attr('action')}`;
        const method = $(this).attr('method');
        const data   = $(this).serialize();

        console.log(url, method, data);
        return App.ajaxRequest(url, method, data, data => {
          if (data.token) App.setToken(data.token);
          App.loggedInState();
        });
      };

      App.ajaxRequest = function(url, method, data, callback){
        return $.ajax({
          url,
          method,
          data,
          beforeSend: this.setRequestHeader.bind(this)
        })
        .done(callback)
        .fail(data => {
          console.log(data);
        });
      };

      App.setRequestHeader = function(xhr) {
        return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
      };

      App.setToken = function(token){
        return window.localStorage.setItem('token', token);
      };

      App.getToken = function(){
        return window.localStorage.getItem('token');
      };

      App.removeToken = function(){
        return window.localStorage.clear();
      };

      $(App.init.bind(App));



      //     ///////// GEOLOCATION
      //     directionsService = new google.maps.DirectionsService,
      //     directionsDisplay = new google.maps.DirectionsRenderer
      //     //////////////////////
      //
      //     /////////////
      //
      //     document.getElementById('submit').addEventListener('click', function() {
      //       calculateAndDisplayRoute(directionsService, directionsDisplay);
      //     });
      //   }
      //
      //   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      //     var waypts = [];
      //     var checkboxArray = document.getElementById('waypoints');
      //     for (var i = 0; i < checkboxArray.length; i++) {
      //       if (checkboxArray.options[i].selected) {
      //         waypts.push({
      //           location: checkboxArray[i].value,
      //           stopover: true
      //         });
      //       }
      //     }
      //
      //     directionsService.route({
      //       origin: document.getElementById('start').value,
      //       destination: document.getElementById('end').value,
      //       waypoints: waypts,
      //       optimizeWaypoints: true,
      //       travelMode: 'WALKING'
      //     }, function(response, status) {
      //       if (status === 'OK') {
      //         directionsDisplay.setDirections(response);
      //         var route = response.routes[0];
      //         var summaryPanel = document.getElementById('directions-panel');
      //         summaryPanel.innerHTML = '';
      //         // For each route, display summary information.
      //         for (var i = 0; i < route.legs.length; i++) {
      //           var routeSegment = i + 1;
      //           summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
      //               '</b><br>';
      //           summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      //           summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      //           summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      //         }
      //       } else {
      //         window.alert('Directions request failed due to ' + status);
      //       }
      //     });
      //   }
      // /////////////////////////////////

      function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
          originInput, {placeIdOnly: true});
          var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

            // this.setupClickListener('changemode-walking', 'WALKING');
            // this.setupClickListener('changemode-transit', 'TRANSIT');
            // this.setupClickListener('changemode-driving', 'DRIVING');

            this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
            this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
          }

          // Sets a listener on a radio button to change the filter type on Places
          // Autocomplete.
          AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
            var radioButton = document.getElementById(id);
            var me = this;
            radioButton.addEventListener('click', function() {
              // me.travelMode = mode;
              me.route();
            });
          };

          AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
            var me = this;
            autocomplete.bindTo('bounds', this.map);
            autocomplete.addListener('place_changed', function() {
              var place = autocomplete.getPlace();
              if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
              }
              if (mode === 'ORIG') {
                me.originPlaceId = place.place_id;
              } else {
                me.destinationPlaceId = place.place_id;
              }
              me.route();
            });

          };

          AutocompleteDirectionsHandler.prototype.route = function() {
            if (!this.originPlaceId || !this.destinationPlaceId) {
              return;
            }
            var me = this;

            var waypts = [];

            this.directionsService.route({
              origin: {'placeId': this.originPlaceId},
              destination: {'placeId': this.destinationPlaceId},
              travelMode: 'WALKING',
              // waypoints: waypts,
              // optimizeWaypoints: true
            }, function(response, status) {
              if (status === 'OK') {
                me.directionsDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
          };
