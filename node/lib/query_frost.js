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
		subfolder: 		'frost',
		browse_img: 	"_thn.jpg",
		geojson: 		undefined,
		topojson: 		".topojson",
		topojson_gz: 	".topojson.gz",
		source: 		'sources.rcmrd',
		sensor: 		'sensors.modis',
		resolution: 	'500m',
		original_url:   source_url,
		product: 		'frost',
		tags: 			['frost', 'disasters'],
		minzoom: 		6
	}
	
	var colors 			= ["#ffffff","#00ff00", "#ff9a00", "#ff0000", "#ff99cc", "#cc00cc" ]
	var levels 			= [0,1,2,3,4,5]
	
	options.credits	= function(req) {
		var json = {
			"credits":  req.gettext("legend.frost.credits"),
			"url": 		source_url,
		};
		return json;
	}
	
    options.style = function(req) {
		var json = {
    		{ frost } == levels[0] : {
    			color: colors[0],
    			weight: 1,
    		},
    		{ frost } == levels[1] : {
    			color: colors[1],
    			weight: 1,
    		},
    		{ frost } == levels[2] : {
    			color: colors[2],
    			weight: 1,
    		},
    		{ frost } == levels[3] : {
    			color: colors[3],
    			weight: 1,
    		},
    		{ frost } == levels[4] : {
    			color: colors[4],
    			weight: 1,
    		},
    		{ frost } == levels[5] : {
    			color: colors[5],
    			weight: 1,
    		},

		}
		return json
	}

	options.legend = function(req) {
		var html = "<style id='frost_legend_style' >"
	    html += ".frost_map-info .legend-scale ul {"
	    html += "   margin: 0;"
	    html += "   margin-bottom: 5px;"
	    html += "   padding: 0;"
	    html += "   float: right;"
	    html += "   list-style: none;"
	    html += "   }"
		html += ".frost_map-info .legend-scale ul li {"
		html += "   font-size: 80%;"
		html += "   list-style: none;"
		html += "    margin-left: 0;"
		html += "    line-height: 18px;"
		html += "    margin-bottom: 2px;"
		html += "}"
	    html += ".frost_map-info ul.legend-labels li span {"
	    html += "  display: block;"
	    html += "  float: left;"
	    html += "  height: 16px;"
	    html += "  width: 30px;"
	    html += "  margin-right: 5px;"
	    html += "  margin-left: 0;"
	    html += "  border: 1px solid #999;"
	    html += "}"
	    html += ".frost_map-info .legend-source {"
	    html += "   font-size: 70%;"
	    html += "   color: #999;"
	    html += "   clear: both;"
	    html += "}"
		html += ".frost_map-info {"
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
	
		html += "<div id='frost_legend' class='frost_map-info'>"
		html += "  <div class='legend-title'>"+ req.gettext("legend.frost.title")+"</div>"
		html += "  <div class='legend-scale'>"
		html += "    <ul class='legend-labels'>"
		html += "	   <li><span style='background:"+colors[1]+"></span>&nbsp;"+ req.gettext("legend.frost.legend.1") +"</li>"
		html += "	   <li><span style='background:"+colors[2]+"></span>&nbsp;"+ req.gettext("legend.frost.legend.2") +"</li>"
		html += "	   <li><span style='background:"+colors[3]+"></span>&nbsp;"+ req.gettext("legend.frost.legend.3") +"</li>"
		html += "	   <li><span style='background:"+colors[4]+"></span>&nbsp;"+ req.gettext("legend.frost.legend.4") +"</li>"
		html += "	   <li><span style='background:"+colors[5]+"></span>&nbsp;"+ req.gettext("legend.frost.legend.5") +"</li>"
        html += "    </ul>"
		html += "  </div>"
		html += "<div class='legend-source'>"+ req.gettext("legend.frost.source.label")+": <a href='"+ source_url+"'>"+ req.gettext("legend.frost.source.source")+"</a>"
		html += "</div>&nbsp;&nbsp;"
	
		console.log("legend title", req.gettext("legend.frost.title"))
	
		return html
	}
	
	var query	= new Query(options)

	module.exports.query 			= query;
