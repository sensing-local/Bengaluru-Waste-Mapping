var mapLayers = require('./map-layer-config')
var ECILookup = require('./ECILookup')
// var mapLayers = {}


module.exports = addMapLayers

// Add styling to map layers to show active and hover constituencies

function addMapLayers(map) {

    map.addSource('electoral', mapLayers['electoral'].source)
    map.addLayer(mapLayers['electoral']['ac fill']);

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