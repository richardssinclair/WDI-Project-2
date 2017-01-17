const App    = App || {};
const google = google;

//makes the app, runs the functions in the authenticatons form
App.init = function() {
  this.createMap();
  this.apiUrl = 'http://localhost:3000/api';
  this.markersArray = [];
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.home').on('click', this.homepage.bind(this));
  $('.modal').on('submit', 'form', this.handleForm);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
};

App.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.register();
};

App.register = function(e){
  if (e) e.preventDefault();
  $('.modal-content').html(`
    <form method="post" action="/register">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">Register</h4>
    <p>Are you thirsty? sign up to get on with your pub crawl</p>
    </div>
    <div class="modal-body">
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
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    <input class="btn btn-primary" type="submit" value="Register">
    </div>
    </form>`);

  $('.modal').modal('show');
};

//login function so users can log in to the map
App.login = function(e) {
  e.preventDefault();
  $('.modal-content').html(`
      <form method="post" action="/login">
      <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">
      <div class="form-group">
      <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <input class="btn btn-primary" type="submit" value="Login">
      </div>
      </form>`);

  $('.modal').modal('show');
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
  e.preventDefault();
  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

      // Hide the modal.
      // Might want to work out slightly better logic for this if the form fails?
  $('.modal').modal('hide');

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

    // ------------------------------------------------------------------------
    // MAP RELATED CODE

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
        'featureType': 'administrative.country',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'administrative.country',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'visibility': 'on'
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
            'color': '#efc952'
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
        'featureType': 'road.highway',
        'elementType': 'labels.text',
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
            'color': '#efc952'
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
        'featureType': 'road.highway.controlled_access',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#efc952'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'simplified'
          },
          {
            'color': '#000000'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#efc952'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'simplified'
          },
          {
            'color': '#000000'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#334d5c'
          },
          {
            'visibility': 'on'
          }
        ]
      }
    ]
  };
      //--------need to call the pub marker action-here?-----
  this.map = new google.maps.Map(canvas, mapOptions);
  this.getCurrentLocation();
  this.AutocompleteDirectionsHandler();
  //this.getPubMarker();
};

App.getCurrentLocation = function() {
  navigator.geolocation.getCurrentPosition(position => {
    App.currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    //semicolan here.............
    const icon = {
      url: 'images/dot.png',
      scaledSize: new google.maps.Size(20, 20),
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

      // App.ajaxRequest('http://localhost:3000/api/pubs', 'GET');
};

App.AutocompleteDirectionsHandler = function() {
  this.originPlaceId      = null;
  this.destinationPlaceId = null;
// Find the two autocomplete fields
  this.destinationInput   = document.getElementById('destination-input');
  this.numberOfPubsInput  = document.getElementById('number-of-pubs-input');
  this.directionsService  = new google.maps.DirectionsService;
  this.directionsDisplay  = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });

  this.directionsDisplay.setMap(this.map);

// Make the autocomplete fields work
  var destinationAutocomplete = new google.maps.places.Autocomplete(this.destinationInput,{placeIdOnly: true});

// Setup an event listener for when the autocompletes files
  this.setupPlaceChangedListener(destinationAutocomplete);

// Start routing when you click on the submit button.
  $('#calculateRoute').on('submit', this.route.bind(this));
};

App.setupPlaceChangedListener = function(autocomplete) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert('Please select an option from the dropdown list.');
      return;
    }
    me.destinationPlaceId = place.place_id;
  });
};

App.getPubs = function(latitude, longitude, numberOfPubs, callback) {
  return App.ajaxRequest(`http://localhost:3000/api/pubs?latitude=${latitude}&longitude=${longitude}&limit=${numberOfPubs}`, 'GET', null, callback);
};

App.route = function(e) {
  e.preventDefault();

  var me = this;

  const numberOfPubs = this.numberOfPubsInput.value;

  if (!me.destinationPlaceId || !numberOfPubs) {
    alert('Please fill in all fields!');
    return;
  }
//----------------------------might be here for info
  App.getPubs(App.currentLocation.lat, App.currentLocation.lng, numberOfPubs, data => {
    var waypts = [];
    var infoForWaypts = [];
    data.pubs.forEach(pub => {
      waypts.push({
        location: { lat: pub.loc[1], lng: pub.loc[0] },
        stopover: true
      });
      infoForWaypts.push({
        image: pub.image,
        name: pub.name,
        description: pub.description
      });
    });
    for (var i = 0; i < App.markersArray.length; i++) {
      App.markersArray[i].setMap(null);
    }
    waypts.forEach((waypt, index) => {
      const icon = {
        url: 'images/beer.png',
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
        // GeoMarker: new GeolocationMarker(canvas)
      };
      const latlng = new google.maps.LatLng(waypt.location.lat, waypt.location.lng );
      const marker = new google.maps.Marker({
        position: latlng,
        icon: icon,
        map: App.map
      });
      App.markersArray.push(marker);
      google.maps.event.addListener(marker, 'click', () => {
        if (typeof this.infowindow !== 'undefined') this.infowindow.close();
        this.infowindow = new google.maps.InfoWindow({
          content: `
            <div class="infowindow">
            <img class="pubImage" src="${ infoForWaypts[index].image }">
            <h3> ${infoForWaypts[index].name } </h3>
            <p> ${ infoForWaypts[index].description } </p>
            </div>`,
          maxWidth: 300
        });
        this.infowindow.open(this.map, marker);
        this.map.setCenter(marker.getPosition());
      });
      App.directionsService.route({
        origin: { lat: App.currentLocation.lat, lng: App.currentLocation.lng },
        destination: { 'placeId': this.destinationPlaceId },
        travelMode: 'WALKING',
        waypoints: waypts,
        optimizeWaypoints: true
      }, function(response, status) {
        if (status === 'OK') {
          me.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  });
      // App.directionsService  = new google.maps.DirectionsService();
      // App.directionsDisplay  = new google.maps.DirectionsRenderer({
      //   suppressMarkers: true
      // });
  console.log('here');
};

$(App.init.bind(App));
