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