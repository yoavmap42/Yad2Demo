var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var regionSource = new ol.source.Vector();
var citySource = new ol.source.Vector();

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'שכבות'
});

var createPointStyleFunction = function () {
    return function (feature) {
        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({ color: feature.bgColor != null ? feature.bgColor : '#FF2266' }),
                stroke: new ol.style.Stroke({
                    color: feature.borderColor != null ? feature.borderColor : '#FFC1C1',
                    width: feature.borderWidth != null ? feature.borderWidth : 2
                })
            }),
            text: new ol.style.Text({
                text: feature.name,
                font: 'Bold 12px Arial',
                fill: new ol.style.Fill({ color: feature.labelColor != null ? feature.labelColor : '#000' }),
                stroke: new ol.style.Stroke({
                    color: feature.labelBorderColor != null ? feature.labelBorderColor : '#fff',
                    width: feature.labelBorderWidth != null ? feature.labelBorderWidth : 1
                }),
                offsetY: -15
            })
        });
        return [style];
    };
};


var createPolyStyleFunction = function () {
    return function (feature) {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: feature.bgColor != null ? feature.bgColor : 'rgba(255,165,0, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: feature.borderColor != null ? feature.borderColor : '#FF7F50',
                width: feature.borderWidth != null ? feature.borderWidth : 2
            }),
            text: new ol.style.Text({
                text: feature.name,
                font: 'Bold 24px Arial',
                fill: new ol.style.Fill({ color: feature.labelColor != null ? feature.labelColor : '#000' }),
                stroke: new ol.style.Stroke({
                    color: feature.labelBorderColor != null ? feature.labelBorderColor : '#000',
                    width: feature.labelBorderWidth != null ? feature.labelBorderWidth : 2
                })
                //offsetY: -15
            }),
            image: new ol.style.Circle({
                radius: feature.radius != null ? feature.radius : 7,
                fill: new ol.style.Fill({
                    color: feature.bgColor != null ? feature.bgColor : '#399ff'
                })
            })
        });
        return [style];
    };
};

var createPolySelectedStyleFunction = function () {
    return function (feature) {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(256, 128, 128, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#FF7F50',
                width: 2
            }),
            text: new ol.style.Text({
                text: feature.name,
                font: 'Bold 24px Arial',
                fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 1)' }),
                stroke: new ol.style.Stroke({
                    color: '#000',
                    width: 2
                })
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#399ff'
                })
            })
        });
        return [style];
    };
};

regionLayer = new ol.layer.Vector({
    source: regionSource,
    style: createPolyStyleFunction(),
    title: 'אזורים',
    name: 'regions'
});

cityLayer = new ol.layer.Vector({
    source: citySource,
    style: createPolyStyleFunction(),
    title: 'ערים'
});

regionLayer.on('change:visible', function () {
    if (regionLayer.getVisible() && regionLayer.getSource().getFeatures().length == 0) {
        initPolyLayer("/GetAreas", null, regionLayer);
    }
});

var select = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    style: createPolySelectedStyleFunction(),
    wrapX: false,
    toggleCondition: ol.events.condition.never,
    addCondition: ol.events.condition.altKeyOnly,
    removeCondition: ol.events.condition.shiftKeyOnly
});

var map = new ol.Map({
    controls: ol.control.defaults({ attribution: false }).
    extend([layerSwitcher]),
    interactions: ol.interaction.defaults().extend([select]),
    layers: [raster, cityLayer, regionLayer],
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

map.on('singleclick', function (evt) {
    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {        
        if (layer.U.name == 'regions') {
            debugger
            regionLayer.setVisible(false);
        }
    });
});


var initPolyLayer = function (action, params, layer) {
    $.get(action, params, function (result) {
        var format = new ol.format.WKT();
        var featr;
        for (var i = 0; i < result.length; i++) {
            featr = format.readFeature(result[i].Geometry.Geometry.WellKnownText);
            featr.name = result[i].Name;
            featr.id = result[i].Id;
            featr.bgColor = result[i].BgColor;
            featr.borderColor = result[i].BorderColor;
            featr.labelColor = result[i].LabelColor;
            featr.labelBorderColor = result[i].LabelBorderColor;
            featr.borderWidth = result[i].BorderWidth;
            featr.labelBorderWidth = result[i].LabelBorderWidth;

            featr.getGeometry();
            layer.getSource().addFeature(featr);
        }
    }, "json")
};
initPolyLayer("/GetAreas", null, regionLayer);
initPolyLayer("/GetCities", null, cityLayer);