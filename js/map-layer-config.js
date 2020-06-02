module.exports = {
    'access-token' :'pk.eyJ1IjoicGxhbmVtYWQiLCJhIjoiY2p1M3JuNnRjMGZ2NzN6bGVqN3Z4bmVtOSJ9.Fx0kmfg-7ll2Oi-7ZVJrfQ',
    // Map innitialization
    map: {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 12, // Zoom level on click
        bounds: [77.42,12.86,77.78,13.10], // Map extent to fit on load
        maxBounds: [77.325897,12.756892,77.882080,13.147690], 
        pitchWithRotate: false,
        hash: true
      },
    // Queryable feature layers on click
    // for the queries to work, then need to be visible in the map style
    // to make innvisible queryable layers, set the paint opacity to 0
    'click-layer-ids': ['ac fill','bbmp-block fill'], 
    // Corresponding tileset ids for feature querying
    'click-layer-tileset-ids': ['planemad.3picr4b8','sensinglocal.cjvc9gje019mc2xlmcok08drz-39ig2'],
    'bbmp-block': {
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
    },
    'electoral': {
        source: {
            type: 'vector',
            url: 'mapbox://planemad.3picr4b8'
        },
        'ac fill': {
            "id": "ac fill",
            "type": "fill",
            "source": 'electoral',
            "source-layer": "ac",
            "paint": {
                "fill-color": "green",
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