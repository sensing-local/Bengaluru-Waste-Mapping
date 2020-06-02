(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {"1":{"ECI_code":"S09","state":"Jammu & Kashmir"},"2":{"ECI_code":"S08","state":"Himachal Pradesh"},"3":{"ECI_code":"S19","state":"Punjab"},"4":{"ECI_code":"U02","state":"Chandigarh"},"5":{"ECI_code":"S28","state":"Uttarakhand"},"6":{"ECI_code":"S07","state":"Haryana"},"7":{"ECI_code":"U05","state":"NCT OF Delhi"},"8":{"ECI_code":"S20","state":"Rajasthan"},"9":{"ECI_code":"S24","state":"Uttar Pradesh"},"10":{"ECI_code":"S04","state":"Bihar"},"11":{"ECI_code":"S21","state":"Sikkim"},"12":{"ECI_code":"S02","state":"Arunachal Pradesh"},"13":{"ECI_code":"S17","state":"Nagaland"},"14":{"ECI_code":"S14","state":"Manipur"},"15":{"ECI_code":"S16","state":"Mizoram"},"16":{"ECI_code":"S23","state":"Tripura"},"17":{"ECI_code":"S15","state":"Meghalaya"},"18":{"ECI_code":"S03","state":"Assam"},"19":{"ECI_code":"S25","state":"West Bengal"},"20":{"ECI_code":"S27","state":"Jharkhand"},"21":{"ECI_code":"S18","state":"Odisha"},"22":{"ECI_code":"S26","state":"Chhattisgarh"},"23":{"ECI_code":"S12","state":"Madhya Pradesh"},"24":{"ECI_code":"S06","state":"Gujarat"},"25":{"ECI_code":"U04","state":"Daman & Diu"},"26":{"ECI_code":"U03","state":"Dadra & Nagar Haveli"},"27":{"ECI_code":"S13","state":"Maharashtra"},"29":{"ECI_code":"S10","state":"Karnataka"},"30":{"ECI_code":"S05","state":"Goa"},"31":{"ECI_code":"U06","state":"Lakshadweep"},"32":{"ECI_code":"S11","state":"Kerala"},"33":{"ECI_code":"S22","state":"Tamil Nadu"},"34":{"ECI_code":"U07","state":"Puducherry"},"35":{"ECI_code":"U01","state":"Andaman & Nicobar Islands"},"36":{"ECI_code":"S29","state":"Telangana"},"37":{"ECI_code":"S01","state":"Andhra Pradesh"}};
},{}],2:[function(require,module,exports){
var mapLayers = require('./map-layer-config')
var ECILookup = require('./ECILookup')
// var mapLayers = {}


module.exports = addMapLayers

// Add styling to map layers to show active and hover constituencies

function addMapLayers(map) {

    map.addSource('bbmp-block', mapLayers['bbmp-block'].source)
    map.addLayer(mapLayers['bbmp-block']['bbmp-block line']);
    map.addLayer(mapLayers['bbmp-block']['bbmp-block fill']);

    map.setPaintProperty('pc line border-highlight', 'line-color', [
        "match", ["feature-state", "state"], 'active',
        "hsl(62, 97%, 61%)",
        "hsl(22, 98%, 92%)"
    ])

    map.setPaintProperty('pc line border-highlight', 'line-gap-width', [
        "match", ["feature-state", "state"], 'active',
        1,
        "match", ["feature-state", "state"], 'hover',
        0,
        0
    ])

    map.setPaintProperty('pc fill mask', 'fill-opacity', [
        "match", ["feature-state", "state"], 'active',
        0,
        "match", ["feature-state", "state"], 'hover',
        0.2,
        0.6
    ])

}
},{"./ECILookup":1,"./map-layer-config":9}],3:[function(require,module,exports){
/**
 * Mapbox Marker
 * Add a marker upon user click
 * Remove any existing marker before adding one
 */

// Track marker so that we can remove on the next user click
var marker;

function addMarker(map, e) {

  // Remove existing marker
  if (marker) {
    marker.remove();

    // Quick hack so that it is easy to check whether user has clicked
    marker = undefined;
  }

  // Add marker on user click
  marker = new mapboxgl.Marker()
    .setLngLat(e.lngLat)
    .addTo(map)
  ;

  map.flyTo({center: [e.lngLat.lng,e.lngLat.lat]})

}

function userHasClicked() {
  return marker !== undefined;
}

module.exports = { addMarker, userHasClicked, };

},{}],4:[function(require,module,exports){
module.exports = addSpreadsheetData;

// https://docs.google.com/spreadsheets/d/e/2PACX-1vS28qKU6gXipgNSwla32jCSh4UhCzcg9VE9GgPfjDVu56wTW-gbLZiWI1xrK6xmKbl2LwAO3Ib9ThsZ/pub?output=csv

// https://docs.google.com/spreadsheets/d/e/2PACX-1vS28qKU6gXipgNSwla32jCSh4UhCzcg9VE9GgPfjDVu56wTW-gbLZiWI1xrK6xmKbl2LwAO3Ib9ThsZ/pub?gid=1578100145&single=true&output=csv
function addSpreadsheetData() {
}
},{}],5:[function(require,module,exports){
/*
 * Mapbox GL Tools - Add Default Mapbox Controls
 * Adds a set of UI controls for Mapbox Maps
 */

function addMapControls(map, accessToken, options) {

  // Add  map UI controls
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-right');

  if (typeof accessToken !== 'undefined') {
    var geocoder = new MapboxGeocoder({
      accessToken: accessToken,

      // limit results 
      countries: options.MapboxGeocoder.countries,

      // further limit results to the geographic bounds representing the region
      bbox: options.MapboxGeocoder.bbox

    });
    map.addControl(geocoder, options.MapboxGeocoder.position || 'top-left');

    // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder.on('result', function (event) {});

  }

  var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
  });
  map.addControl(scale);


  map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

  return {
    NavigationControl : nav,
    MapboxGeocoder : geocoder,
    ScaleControl : scale
  }
}

module.exports = addMapControls;

},{}],6:[function(require,module,exports){
var mapLayers = require('./map-layer-config')
module.exports = getTilequeryURL

function getTilequeryURL (lngLat) {
  return `https://api.mapbox.com/v4/${mapLayers['bbmp-block']["tileset-id"]}/tilequery/${lngLat.lng},${lngLat.lat}.json?limit=5&radius=0&dedupe=true&access_token=${mapboxgl.accessToken}`
}
},{"./map-layer-config":9}],7:[function(require,module,exports){
'use strict';

var addMapControls = require('./addMapControls')
var showDataAtPoint = require('./show-data-at-point')
var locateUser = require('./locate-user')
var mapLayers = require('./map-layer-config')
var addMapLayers = require('./add-map-layers')
var addSpreadsheetData = require('./add-spreadsheet-data')

// Enable Mapbox services
mapboxgl.accessToken = 'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiY2p1M3JuNnRjMGZ2NzN6bGVqN3Z4bmVtOSJ9.Fx0kmfg-7ll2Oi-7ZVJrfQ';

// App configuration
const _app = {
  map: {
    init: {
      container: 'map',
      style: 'mapbox://styles/planemad/cjoescdh20cl62spey0zj3v19',
      bounds: [77.42,12.86,77.78,13.10],
      maxBounds: [77.325897,12.756892,77.882080,13.147690],
      pitchWithRotate: false,
      hash: true
    }
  }
}

// Initialize GL map
var map = new mapboxgl.Map(_app.map.init);

map.on('load', () => {

  // Setup map layers for styling
  addMapLayers(map);

  // Load additional attributes from spreadsheet
  addSpreadsheetData();

  // Find user location
  locateUser(map);

  // Add map UI controls
  addMapControls(map, mapboxgl.accessToken, {
    MapboxGeocoder: {
      position: 'top-right',
      countries: 'in'
    }
  });
  map.touchZoomRotate.disableRotation();

  //Define map interactivity

  map.on('click', mapLayers["click-layer-ids"][0], (e) => {

    // Show constituency details at location
    showDataAtPoint(map, e)

  })

  // // Add hover effect on mouseover
  // var hoveredFeatureId = null;
  // map.on('mousemove', 'pc fill mask', (e) => {

  //   if (e.features[0].id != hoveredFeatureId) {

  //     var currentState = map.getFeatureState({
  //       source: 'mapbox://planemad.3picr4b8',
  //       sourceLayer: 'pc',
  //       id: e.features[0].id
  //     })['state']

  //     if (currentState != 'active') {

  //       map.removeFeatureState({
  //         source: 'mapbox://planemad.3picr4b8',
  //         sourceLayer: 'pc',
  //         id: hoveredFeatureId
  //       }, 'state');

  //       map.setFeatureState({
  //         source: 'mapbox://planemad.3picr4b8',
  //         sourceLayer: 'pc',
  //         id: e.features[0].id
  //       }, {
  //         state: 'hover'
  //       });

  //       hoveredFeatureId = e.features[0].id;

  //     }
  //   }
  // })

});
},{"./add-map-layers":2,"./add-spreadsheet-data":4,"./addMapControls":5,"./locate-user":8,"./map-layer-config":9,"./show-data-at-point":11}],8:[function(require,module,exports){
var showDataAtPoint = require('./show-data-at-point')
var Markers = require('./add-marker');
var browserLocated = false

module.exports = locateUser

function errorHandler(err) {
  console.log('error getting user location', err)
}

function locateUser(map) {

  function showLocation(position) {

    // User has an active location clicked and thus we don't need Browser Geolocation
    if (Markers.userHasClicked()) {
      return;
    }

    browserLocated = true

    var lngLat = {
      lng: position.coords.longitude,
      lat: position.coords.latitude
    }

    // Abort if user coordinate is outside India
    if (!(lngLat.lng > 63 && lngLat.lng < 97 && lngLat.lat > 7 && lngLat.lat < 36)) {
      return
    }

    showDataAtPoint(map, {
      lngLat: lngLat
    })

  }

  if (navigator.geolocation) {
    // timeout at 60000 milliseconds (60 seconds)
    var options = {
      timeout: 60000
    }
    navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options)
  } else {
    console.log("Browser does not support geolocation!")
  }

  // we fire the IP location request after 2 seconds
  // if the browser location has not worked until then
  // if the user clicked, do not fire the request
  //                      do not display if the user clicked in between
  setTimeout(() => {
    if (browserLocated || Markers.userHasClicked()) return
    fetch('https://publicmap-freegeoip.herokuapp.com/json/')
      .then(response => response.json())
      .then(body => {
        if (!browserLocated && !Markers.userHasClicked()) {

          var lngLat = {
            lng: body.longitude,
            lat: body.latitude
          }

          // Abort if user coordinate is outside India
          if (!(lngLat.lng > 63 && lngLat.lng < 97 && lngLat.lat > 7 && lngLat.lat < 36)) {
            return
          }

          showDataAtPoint(map, {
            lngLat: lngLat
          })

          map.flyTo({
            center: [lngLat.lng, lngLat.lat],
            zoom: 9
          });

        }
      })
  }, 2000)
}
},{"./add-marker":3,"./show-data-at-point":11}],9:[function(require,module,exports){
module.exports = {
    'click-layer-ids': ['pc fill mask','bbmp-block fill'],
    'bbmp-block': {
        'tileset-id': 'sensinglocal.cjvc9gje019mc2xlmcok08drz-39ig2',
        source: {
            type: 'vector',
            url: 'mapbox://sensinglocal.cjvc9gje019mc2xlmcok08drz-39ig2'
        },
        'bbmp-block line': {
            "id": "bbmp-block line",
            "type": "line",
            "source": 'bbmp-block',
            "source-layer": "Blocks_with_Data",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#ff69b4",
                "line-width": 1
            }
        },
        'bbmp-block fill': {
            "id": "bbmp-block fill",
            "type": "fill",
            "source": 'bbmp-block',
            "source-layer": "Blocks_with_Data",
            "paint": {
                "fill-color": "#000",
                "fill-opacity": 0
            }
        }
    }
}

// HI No
// String
// Supervisor
// String
// HI Name
// String
// AT_No
// Number
// 1 - 41
// Sup_ No
// String
// AT Driver
// String
// Vehicle No
// String
// Driver No
// String
// Block Name
// String
// Block Nos
// String
},{}],10:[function(require,module,exports){
if (typeof Object.assign != 'function') {
  console.log('This polyfill for Object.assign command is being run in a browser that has an incompatibility issue. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Browser_compatibility .');
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

},{}],11:[function(require,module,exports){
var getTilequeryURL = require('./get-tilequery-url')
var ECILookup = require('./ECILookup')
var Markers = require('./add-marker')
var mapLayers = require('./map-layer-config')
require('./object-assign-polyfill')

module.exports = showDataAtPoint

function showDataAtPoint(map, e) {

  var featuresAtPoint = {lngLat:e.lngLat};

  // Query rendered features at clicked point and store results into an object
  map.queryRenderedFeatures(e.point, {
    layers: mapLayers["click-layer-ids"]
  }).forEach(feature => {
    featuresAtPoint[feature.sourceLayer] = feature;
  })

  console.log(featuresAtPoint);

  // Add marker at clicked location
  Markers.addMarker(map, e);

  map.flyTo({
    center: [e.lngLat.lng, e.lngLat.lat]
  })

  // If event object has tile features from clicked event, use it to update the info panel
  // Else fetch the features at that point using the tilequery API
  if (Object.keys(featuresAtPoint>1)) {
    updateInfoPanel(map, featuresAtPoint);
  } else {
    // use fetch to fetch data - this maintains consistency with using fetch elsewhere
    // if we have browser considerations where `fetch` does not work,
    // we can replace this with $.getJSON or so
    const tilequeryURL = getTilequeryURL(e.lngLat)
    fetch(tilequeryURL)
      .then(response => response.json())
      .then(data => {

        // merge the damn properies
        // var holder = Object.assign({}, data.features[0].properties, data.features[1].properties);

        var featuresAtPoint = {}
        data.features.forEach(feature => {
          featuresAtPoint[feature.properties.tilequery.layer] = feature;
        });

        updateInfoPanel(map, featuresAtPoint);

      })
      .catch(err => {
        document.getElementById('infoPanel').classList.remove('loading');
        document.getElementById('infoPanel').innerHTML = `Error while fetching data for that location`;
      })
  }
}

var activeFeatureId = null;

function updateInfoPanel(map, featuresAtPoint) {

  console.log('Features at Point:', featuresAtPoint);

  // Add a loading spinner to the infoPanel while we fetch data
  document.getElementById('infoPanel').innerHTML = '';
  document.getElementById('infoPanel').classList.add('loading', 'loading--s');

  var ECI_code = ECILookup[String(featuresAtPoint.pc.properties.st_code)]['ECI_code'];

  // Composing link to Official ECI candidates affidavits page: https://affidavit.eci.gov.in/showaffidavit/1/S13/34/PC
  var ECIAffidavit_URL = `https://affidavit.eci.gov.in/showaffidavit/1/${ECI_code}/${String(featuresAtPoint.pc.properties.pc_no)}/PC`;

  // Composing info
  // var info = `<span class='txt-light'>2019 Lok Sabha Elections</span><br>
  //   <span class='txt-light'>Your Constituency: </span><b>${featuresAtPoint.pc.properties.pc_name}</b> (${featuresAtPoint.pc.properties.pc_no})<br>
  //   <span class='txt-light'>Voting is on: </span><b>${featuresAtPoint.pc.properties['2019_election_date'].split('T')[0]}</b> (Phase ${featuresAtPoint.pc.properties['2019_election_phase']})<br>
  //   <a href="${ECIAffidavit_URL}" target="_blank" class="link">Click here to see the Candidates</a> <br>
  //   State: ${featuresAtPoint.pc.properties.st_name} (${ECI_code})<br>
  //   `;

   var infoPanel =  {
      'HI No': 'txt-light',
'Supervisor': 'txt-light',
'HI Name': 'txt-light',
'AT_No': 'txt-light',
'Sup_ No': 'txt-light',
'AT Driver': 'txt-light',
'Vehicle No': 'txt-light',
'Driver No': 'txt-light',
'Block Name': 'txt-light',
'Block Nos': 'txt-light'
    }
    var info='';
Object.keys(infoPanel).forEach(key=>{
  info+=`<span class='${infoPanel[key]}'>${key}</span> <b>${featuresAtPoint['Blocks_with_Data'].properties[key]}</b><br>`
})

  document.getElementById('infoPanel').classList.remove('loading');
  document.getElementById('infoPanel').innerHTML = info;

  // Clear previous and set the feature-state of the selected constieuncy feature id in the style layer as 'active'
  map.removeFeatureState({
    source: 'mapbox://planemad.3picr4b8',
    sourceLayer: 'pc'
  });
  map.setFeatureState({
    source: 'mapbox://planemad.3picr4b8',
    sourceLayer: 'pc',
    id: featuresAtPoint.pc.id
  }, {
    state: 'active'
  });

}
},{"./ECILookup":1,"./add-marker":3,"./get-tilequery-url":6,"./map-layer-config":9,"./object-assign-polyfill":10}]},{},[7]);
