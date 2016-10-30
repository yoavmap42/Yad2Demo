var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var regionSource = new ol.source.Vector();
var citySource = new ol.source.Vector();
var neighborhoodSource = new ol.source.Vector();
var adSource = new ol.source.Vector();

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'שכבות'
});

var createPointStyleFunction = function () {
    return function (feature) {
        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: feature.bgColor != null ? feature.bgColor : '#FF0000' }),
                stroke: new ol.style.Stroke({
                    color: feature.borderColor != null ? feature.borderColor : '#FFF',
                    width: feature.borderWidth != null ? feature.borderWidth : 2
                })
            }),
            text: new ol.style.Text({
                text: feature.name,
                font: '10px Arial',
                fill: new ol.style.Fill({ color: feature.labelColor != null ? feature.labelColor : '#ff0f0f' }),
                stroke: new ol.style.Stroke({
                    color: feature.labelBorderColor != null ? feature.labelBorderColor : '#fff',
                    width: feature.labelBorderWidth != null ? feature.labelBorderWidth : 2
                }),
                offsetY: -5
            })
        });
        return [style];
    };
};


var createPolyStyleFunction = function (font) {
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
                font: 'Bold ' + font + 'px Arial',
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

var emptyImgStyle = new ol.style.Style({ image: '' });

var createPolySelectedStyleFunction = function () {
    return function (feature) {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(256, 256, 256, 0)'
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

var regionLayer = new ol.layer.Vector({
    source: regionSource,
    style: createPolyStyleFunction('24'),
    title: 'אזורים',
    id: 1
});

var cityLayer = new ol.layer.Vector({
    source: citySource,
    style: createPolyStyleFunction('22'),
    title: 'ערים',
    id: 2
});

var neighborhoodLayer = new ol.layer.Vector({
    source: neighborhoodSource,
    style: createPolyStyleFunction('12'),
    title: 'שכונות',
    id: 3
});

var adLayer = new ol.layer.Vector({
    source: adSource,
    style: createPointStyleFunction(),
    title: 'דירות',
    id: 5
});

var select = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    layers: [regionLayer, cityLayer, neighborhoodLayer],
    style: createPolySelectedStyleFunction(),
    wrapX: false,
    toggleCondition: ol.events.condition.never,
    addCondition: ol.events.condition.altKeyOnly,
    removeCondition: ol.events.condition.shiftKeyOnly
});

var clusterSource = new ol.source.Cluster({
    distance: 20,
    source: adSource
});

var styleCache = {};

var clusters = new ol.layer.Vector({
    source: clusterSource,
    id: 4,
    title: 'דירות',
    style: function (feature, resolution) {
        var size = feature.get('features').length;
        if (size == 1) {
            //debugger
        }
        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: size > 1 ? 18 : 10,
                stroke: new ol.style.Stroke({
                    color: size > 1 ? '#fff' : '#fff',
                    width: size > 1 ? 1 : 2
                }),
                fill: new ol.style.Fill({
                    color: size > 1 ? '#3399CC' : '#FF0000'
                })
            }),
            text: new ol.style.Text({
                text: size > 1 ? size.toString() : feature.get('features')[0].name,
                font: size > 1 ? '16px Arial' : '12px Arial',
                fill: new ol.style.Fill({
                    color: size > 1 ? '#fff' : '#ff0f0f'
                }),
                stroke: new ol.style.Stroke({
                    color: size > 1 ? '#fff' : '#fff',
                    width: size > 1 ? 0.5 : 2
                }),
                offsetY: size > 1 ? 0 : -5
            })
        });
        //   styleCache[size] = style;
        return style;
    }
    //   return style;
});

var adselect = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    layers: [clusters],
    //style: createPointSelectedStyleFunction(),
    wrapX: false,
    toggleCondition: ol.events.condition.never,
    addCondition: ol.events.condition.altKeyOnly,
    removeCondition: ol.events.condition.shiftKeyOnly
});

// Popup showing the position the user clicked
var popup = new ol.Overlay({
    element: document.getElementById('popup')
});

adselect.on('select', function (e) {
    if (e.selected.length > 0) {
        var singleSelected = e.selected[0].get('features')[0];
        debugger
        var hoverfeaturetimeout = setTimeout(function () {
            if (e.selected.length > 0) {
                var element = popup.getElement();

                $("#popup").attr('title', singleSelected.rooms + ' חדרים - למכירה');

                $(element).popover('destroy');
                popup.setPosition(e.mapBrowserEvent.coordinate);
                //singleSelected.getGeometry().B

                // the keys are quoted to prevent renaming in ADVANCED mode.
                $(element).popover({
                    'placement': 'top',
                    'offset': '-15px -15px',
                    'animation': false,
                    'html': true,
                    'content': '<img style="height: 100%; width: 100%; object-fit: contain" src="/Content/ads/' + singleSelected.pic + '.jpg" /><br /><p>מחיר: ' + singleSelected.name + '</p>'
                });
                $(element).popover('show');

            } else {
                map.getOverlays().forEach(function (overlay) { map.removeOverlay(overlay) });
            }
        }, 500);
    } else if (e.deselected.length > 0) {
        var singleDeselected = e.deselected[0].get('features')[0];
        var element = popup.getElement();
        $(element).popover('destroy');
    }
});

var setRadiusByAvgPrice = function (feature, resolution) {

    var total = 0;
    var size = feature.get('features').length;
    for (var i = 0; i < size; i++) {
        total += parseFloat(feature.get('features')[i].name.replace(/\D/g, ''));
    }
    var avg = total / size;
    var radius = size / 4 * (avg * 0.000003);
    return radius;
}

var map = new ol.Map({
    controls: ol.control.defaults({ attribution: false }).
    extend([layerSwitcher]),
    interactions: ol.interaction.defaults().extend([select, adselect]),
    layers: [raster, regionLayer, cityLayer, neighborhoodLayer, clusters],
    target: 'map',
    view: new ol.View({
        projection: 'EPSG:4326',
        extent: [34.2200, 29.4900, 35.6800, 33.2700],
        center: [34.79802606, 32.08793202],
        zoom: 12,
        minZoom: 7,
        maxZoom: 20
    })
});

map.addOverlay(popup);

map.on('singleclick', function (evt) {
    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        switch (feature.layerid) {
            case 1:
                initPolyLayer("/GetCitiesByArea", { area: 1 }, cityLayer);
                map.getView().fit(feature.getGeometry(), map.getSize());
                feature.setStyle(emptyImgStyle);
                break;
            case 2:
                initPolyLayer("/GetNeighborhoodsByCity", { city: feature.id }, neighborhoodLayer);
                map.getView().fit(feature.getGeometry(), map.getSize());
                feature.setStyle(emptyImgStyle);
                break;
            case 3:
                initPolyLayer("/GetAdsByNeighborhood", { nid: feature.id }, adLayer);
                map.getView().fit(feature.getGeometry(), map.getSize());
                feature.setStyle(emptyImgStyle);
                break;
            default:
                break;
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
            featr.layerid = layer.U.id;
            featr.pic = result[i].Pic;
            featr.rooms = result[i].Rooms;

            featr.getGeometry();
            layer.getSource().addFeature(featr);
        }
    }, "json")
};

initPolyLayer("/GetAreas", null, regionLayer);