var element;
var hideagent = false;
var hidenoagent = false;
var hidenewapt = false;
var hideoldapt = false;

var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var regionSource = new ol.source.Vector();
var citySource = new ol.source.Vector();
var neighborhoodSource = new ol.source.Vector();
var adSource = new ol.source.Vector();

var hiddenAdSource = new ol.source.Vector();

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'שכבות'
});

var createPointStyleFunction = function () {
    return function (feature) {
        var style = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: '/Content/images/pin.png'
            })

            //    new ol.style.Circle({
            //    radius: 5,
            //    fill: new ol.style.Fill({ color: feature.bgColor != null ? feature.bgColor : '#FF0000' }),
            //    stroke: new ol.style.Stroke({
            //        color: feature.borderColor != null ? feature.borderColor : '#FFF',
            //        width: feature.borderWidth != null ? feature.borderWidth : 2
            //    })
            //})
            //text: new ol.style.Text({
            //    text: feature.name,
            //    font: '10px Arial',
            //    fill: new ol.style.Fill({ color: feature.labelColor != null ? feature.labelColor : '#ff0f0f' }),
            //    stroke: new ol.style.Stroke({
            //        color: feature.labelBorderColor != null ? feature.labelBorderColor : '#fff',
            //        width: feature.labelBorderWidth != null ? feature.labelBorderWidth : 2
            //    }),
            //    offsetY: -5
            //})
        });
        return [style];
    };
};

var createClusterStyleFunction = function () {
    return function (feature, resolution) {
        var size = feature.get('features').length;
        if (size == 1) {
            //debugger
        }
        var style = new ol.style.Style({
            image: size > 1 ? new ol.style.Circle({
                radius: 18,
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: '#3399CC'
                })
            })
            : new ol.style.Icon({
                //  anchor: [0.5, 1],
                src: '/Content/images/pin.png'
            }),
            text: size > 1 ? new ol.style.Text({
                text: size.toString(),
                font: '16px Arial',
                fill: new ol.style.Fill({
                    color: '#fff'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 0.5
                }),
                offsetY: 0
            }) : null
        });
        //   styleCache[size] = style;
        return style;
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
                text: feature.name + ': ' + feature.adscount,
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
    style: createClusterStyleFunction()
});

var adselect = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    layers: [clusters],
    style: createClusterStyleFunction(),
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

        if (e.selected[0].U != null && e.selected[0].get('features').length == 1) {

            var singleSelected = e.selected[0].get('features')[0];

            var hoverfeaturetimeout = setTimeout(function () {
                if (e.selected.length > 0) {
                    element = popup.getElement();

                    $("#popup").attr('title', 'למכירה');

                    $(element).popover('destroy');
                    popup.setPosition(singleSelected.getGeometry().B);
                    //singleSelected.getGeometry().B
                    //e.mapBrowserEvent.coordinate

                    // the keys are quoted to prevent renaming in ADVANCED mode.
                    $(element).popover({
                        'placement': 'auto',
                        'offset': '0 10px',
                        'trigger': 'focus',
                        'animation': false,
                        'viewport': { "selector": "#map", "padding": 5 },
                        'container': '#map',
                        'html': true,
                        'content': '<img style="height: 100%; width: 100%; object-fit: contain" src="/Content/ads/' + singleSelected.pic + '.jpg" /><br /><br /><p>מחיר: '
                            + singleSelected.name + '</p><p>חדרים: ' + singleSelected.rooms + '</p><p>מ"ר: ' + singleSelected.sqft + '</p>'
                    });
                    $(element).popover('show');

                } else {
                    map.getOverlays().forEach(function (overlay) { map.removeOverlay(overlay) });
                }
            }, 500);
        }
    } else if (e.deselected.length > 0) {

        //var singleDeselected = e.deselected[0].get('features')[0];
        //  element = popup.getElement();
        //  $(element).popover('destroy');
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
    if (element != null) {
        $(element).popover('destroy');
    }
    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        switch (feature.layerid) {
            case 1:
                $("#paneldiv").hide('slow');
                neighborhoodSource.clear();
                citySource.clear();
                initPolyLayer("/GetCitiesByArea", { area: 1 }, cityLayer);
                layer.getSource().forEachFeature(function (f) {
                    if (f != feature && f.getStyle() == emptyImgStyle) {
                        f.setStyle(f.originalStyle);
                    }
                });
                feature.originalStyle = feature.getStyle();
                map.getView().fit(feature.getGeometry(), map.getSize());
                map.getView().setZoom(13);
                feature.setStyle(emptyImgStyle);
                break;
            case 2:
                $("#paneldiv").hide('slow');
                adSource.clear();
                hiddenAdSource.clear();
                neighborhoodSource.clear();
                hideagent = false; hidenoagent = false; hidenewapt = false; hideoldapt = false;

                $(".adfilters").each(function () {
                    if (this.checked == false) {
                        $(this).trigger('click');
                    }
                });

                initPolyLayer("/GetNeighborhoodsByCity", { city: feature.id }, neighborhoodLayer);
                layer.getSource().forEachFeature(function (f) {
                    if (f != feature && f.getStyle() == emptyImgStyle) {
                        f.setStyle(f.originalStyle);
                    }
                });
                feature.originalStyle = feature.getStyle();
                map.getView().fit(feature.getGeometry(), map.getSize());
                map.getView().setZoom(14);
                feature.setStyle(emptyImgStyle);
                break;
            case 3:
                adSource.clear();
                hiddenAdSource.clear();
                initPolyLayer("/GetAdsByNeighborhood", { nid: feature.id }, adLayer);

                layer.getSource().forEachFeature(function (f) {
                    if (f != feature && f.getStyle() == emptyImgStyle) {
                        f.setStyle(f.originalStyle);
                    }
                });
                feature.originalStyle = feature.getStyle();
                map.getView().fit(feature.getGeometry(), map.getSize());
                feature.setStyle(emptyImgStyle);
                $("#paneldiv").show('slow');
                break;
            default:
                break;
        }
    });
});

//map.getView().on('change:resolution', function (evt) {
//    var nz = this.getZoom();
//    var nlevel = nz < 13 ? 1 : (nz > 12 && nz < 14 ? 2 : (nz > 13 && nz < 16 ? 3 : 4));

//    var oz = parseInt((Math.log10((1.40625 / evt.oldValue))) / 0.30102999566398114);
//    var olevel = oz < 13 ? 1 : (oz > 12 && oz < 14 ? 2 : (oz > 13 && oz < 16 ? 3 : 4));

//    if (nlevel != olevel) {
//        var layrs = map.getLayers();
//        switch (nlevel) {
//            case 1:
//                //$("#paneldiv").hide('slow');
//                //adSource.clear();
//                //hiddenAdSource.clear();
//                //neighborhoodSource.clear();
//                //citySource.clear();
//                //regionSource.clear();
//                //hideagent = false; hidenoagent = false; hidenewapt = false; hideoldapt = false;

//                //$(".adfilters").each(function () {
//                //    if (this.checked == false) {
//                //        $(this).trigger('click');
//                //    }
//                //});
//              //  initPolyLayer("/GetAreas", null, regionLayer);
//                break;
//            case 2:
//              //  initPolyLayer("/GetCitiesByArea", { area: 1 }, cityLayer);
//                break;
//            default:
//                break;
//        }
//    }
//});

var initPolyLayer = function (action, params, layer) {
    $.get(action, params, function (result) {
        var format = new ol.format.WKT();
        var featr;
        for (var i = 0; i < result.length; i++) {
            featr = format.readFeature(result[i].Geometry.Geometry.WellKnownText);
            featr.name = result[i].Name;
            featr.adscount = result[i].AdCount;
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
            featr.sqft = result[i].Sqft;
            featr.address = result[i].Address;
            featr.price = result[i].Price;
            featr.isagency = result[i].IsAgency;
            featr.isnew = result[i].IsNew;

            featr.getGeometry();
            if (layer == adLayer) {
                if (hideagent && featr.isagency || hidenoagent && !featr.isagency || hidenewapt && featr.isnew || hideoldapt && !featr.isnew) {
                    hiddenAdSource.addFeature(featr);
                } else {
                    layer.getSource().addFeature(featr);
                }
            } else {
                layer.getSource().addFeature(featr);
            }
        }
    }, "json")
};

$(function () {
    initPolyLayer("/GetAreas", null, regionLayer);

    $(".adfilters").on('click', function (e) {
        debugger
        if (element != null) {
            $(element).popover('destroy');
        }
        switch (e.currentTarget.id) {
            case 'noagentswitch':
                if (e.currentTarget.checked === true) {
                    hidenoagent = false;
                    hiddenAdSource.getFeatures().forEach(function (f) {
                        if (!f.isagency && !(hidenewapt && f.isnew || hideoldapt && !f.isnew)) {
                            adSource.addFeature(f);
                            hiddenAdSource.removeFeature(f);
                        }
                    });
                } else {
                    hidenoagent = true;
                    adSource.getFeatures().forEach(function (f) {
                        if (!f.isagency) {
                            hiddenAdSource.addFeature(f);
                            adSource.removeFeature(f);
                        }
                    });
                }
                break;
            case 'agentswitch':
                if (e.currentTarget.checked === true) {
                    hideagent = false;
                    hiddenAdSource.getFeatures().forEach(function (f) {
                        if (f.isagency && !(hidenewapt && f.isnew || hideoldapt && !f.isnew)) {
                            adSource.addFeature(f);
                            hiddenAdSource.removeFeature(f);
                        }
                    });
                } else {
                    hideagent = true;
                    adSource.getFeatures().forEach(function (f) {
                        if (f.isagency) {
                            hiddenAdSource.addFeature(f);
                            adSource.removeFeature(f);
                        }
                    });
                }
                break;
            case 'newaptswitch':
                if (e.currentTarget.checked === true) {
                    hidenewapt = false;
                    hiddenAdSource.getFeatures().forEach(function (f) {
                        if (f.isnew && !(hidenoagent && !f.isagency || hideagent && f.isagency)) {
                            adSource.addFeature(f);
                            hiddenAdSource.removeFeature(f);
                        }
                    });
                } else {
                    hidenewapt = true;
                    adSource.getFeatures().forEach(function (f) {
                        if (f.isnew) {
                            hiddenAdSource.addFeature(f);
                            adSource.removeFeature(f);
                        }
                    });
                }
                break;
            case 'oldaptswitch':
                if (e.currentTarget.checked === true) {
                    hideoldapt = false;
                    hiddenAdSource.getFeatures().forEach(function (f) {
                        if (!f.isnew && !(hidenoagent && !f.isagency || hideagent && f.isagency)) {
                            adSource.addFeature(f);
                            hiddenAdSource.removeFeature(f);
                        }
                    });
                } else {
                    hideoldapt = true;
                    adSource.getFeatures().forEach(function (f) {
                        if (!f.isnew) {
                            hiddenAdSource.addFeature(f);
                            adSource.removeFeature(f);
                        }
                    });
                }
                break;
            default:
                break;
        }
    });
});
