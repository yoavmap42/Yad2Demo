var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var vectorSource = new ol.source.Vector();

var createPointStyleFunction = function () {
    return function (feature) {
        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({ color: '#FF2266' }),
                stroke: new ol.style.Stroke({ color: '#FFC1C1', width: 2 })
            }),
            text: new ol.style.Text({
                text: feature.name,
                font: 'Bold 12px Arial',
                fill: new ol.style.Fill({ color: '#000' }),
                stroke: new ol.style.Stroke({ color: '#fff', width: 1 }),
                offsetY: -15
            })
        });
        return [style];
    };
};

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: createPointStyleFunction()
});

var select = new ol.interaction.Select({
    wrapX: false
});

var map = new ol.Map({
    interactions: ol.interaction.defaults().extend([select]),
    layers: [raster, vectorLayer],
    target: 'map',
    view: new ol.View({
        projection: 'EPSG:4326',
        extent: [34.2200, 29.4900, 35.6800, 33.2700],
        center: [34.785, 32.085],
        zoom: 13,
        minZoom: 7,
        maxZoom: 20
    })
});