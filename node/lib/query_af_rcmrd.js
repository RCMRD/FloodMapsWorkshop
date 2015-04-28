var util 		= require('util'),
	fs			= require('fs'),
	async	 	= require('async'),
	path		= require('path'),
	moment		= require('moment'),
	_			= require('underscore'),
	Hawk		= require('hawk'),
	filesize 	= require('filesize'),
	Query		= require('./query_s3')
	;
	  	
	var source_url = "http://rcmrd.org/"
	
	var options = {
		subfolder: 		'modis_af_rcmrd',
		browse_img: 	"_thn.jpg",
		geojson: 		undefined,
		topojson: 		".topojson",
		topojson_gz: 	".topojson.gz",
		source: 		'sources.umd',
		sensor: 		'sensors.modis',
		resolution: 	'500m',
		original_url:   source_url,
		product: 		'modis_af_rcmrd',
		tags: 			['active_fires', 'fires', 'disasters'],
		minzoom: 		6
	}
	
	var colors 			= ["#990066"]
	var levels 			= [1]
	
	options.credits	= function(req) {
		var json = {
			"credits":  req.gettext("legend.active_fires.credits"),
			"url": 		source_url,
		};
		return json;
	}
	
    options.style = function(req) {
		var json = {
    		"true": {
    			property: 'brightness',
    			scale: 0.1,
    			color: '#ff0000',
    			fillOpacity: 0.5, 
    			weight: 0.5,
    		}
		}
		return json
	}

	options.legend = function(req) {
		var html = "<style id='active_fires_legend_style' >"
	    html += ".active_fires_map-info .legend-scale ul {"
	    html += "   margin: 0;"
	    html += "   margin-bottom: 5px;"
	    html += "   padding: 0;"
	    html += "   float: right;"
	    html += "   list-style: none;"
	    html += "   }"
		html += ".active_fires_map-info .legend-scale ul li {"
		html += "   font-size: 80%;"
		html += "   list-style: none;"
		html += "    margin-left: 0;"
		html += "    line-height: 18px;"
		html += "    margin-bottom: 2px;"
		html += "}"
	    html += ".active_fires_map-info ul.legend-labels li span {"
	    html += "  display: block;"
	    html += "  float: left;"
	    html += "  height: 16px;"
	    html += "  width: 30px;"
	    html += "  margin-right: 5px;"
	    html += "  margin-left: 0;"
	    html += "  border: 1px solid #999;"
	    html += "}"
	    html += ".active_fires_map-info .legend-source {"
	    html += "   font-size: 70%;"
	    html += "   color: #999;"
	    html += "   clear: both;"
	    html += "}"
		html += ".active_fires_map-info {"
		html += "    padding: 6px 8px;"
		html += "    font: 14px/16px Arial, Helvetica, sans-serif;"
		html += "    background: white;"
		html += "    background: rgba(255,255,255,0.8);"
		html += "    box-shadow: 0 0 15px rgba(0,0,0,0.2);"
		html += "    border-radius: 5px;"
		html += "	 position: relative;"
		html += "	 float: right;"
		html += "    line-height: 18px;"
		html += "    color: #555;"
	
		html += "}"
		html += "</style>"
	
		html += "<div id='active_fires_legend' class='active_fires_map-info'>"
		html += "  <div class='legend-title'>"+ req.gettext("legend.active_fires.title")+"</div>"
		html += "  <div class='legend-scale'>"
		html += "    <ul class='legend-labels'>"
		html += "	   <li><span style='background:#ff0000'></span>&nbsp;"+ req.gettext("legend.active_fires.legend.1") +"</li>"
        html += "    </ul>"
		html += "  </div>"
		html += "<div class='legend-source'>"+ req.gettext("legend.active_fires.source.label")+": <a href='"+ source_url+"'>"+ req.gettext("legend.active_fires.source.source")+"</a>"
		html += "</div>&nbsp;&nbsp;"
	
		console.log("legend title", req.gettext("legend.active_fires.title"))
	
		return html
	}
	
	var query	= new Query(options)

	module.exports.query 			= query;
