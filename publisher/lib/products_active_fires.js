var util 			= require('util'),
	fs				= require('fs'),
	async	 		= require('async'),
	path			= require('path'),
	moment			= require('moment'),
	request			= require('request'),
	xml2js 			= require('xml2js'),
	_				= require('underscore'),
	mime			= require('mime-types'),
	Hawk			= require('hawk'),
	query_af		= require("../lib/query_active_fires"),

	debug			= require('debug')('swe');
	
	var bbox 		= 	[60, 20, 80, 40]
	var centerlon	= (bbox[0]+bbox[2])/2
	var centerlat	= (bbox[1]+bbox[3])/2
	var target		= [centerlon, centerlat]
	
	function render_map(region, url, req, res) {
		debug("render_map", url)
		res.render("products/map_api", {
			region: region,
			url: url,
			layout: false
		})
	}
	
	module.exports = {

		browse: function(req,res) {
			var year 	= req.params['year']
			var doy 	= req.params['doy']
			var date 	= moment(year+"-"+doy)
			var host 	= "http://"+req.headers.host
			var region 	= {
				name: 	req.gettext("legend.active_fires.title"),
				scene: 	year+"-"+doy,
				bbox: 	bbox,
				target: target
			}
			
			var jday	= date.dayOfYear()
			if( jday < 10 ) {
				jday = "00"+jday
			} else if( jday < 100 ) jday = "0"+jday

			var month = date.month() + 1
			if( month < 10 ) month = "0"+ month

			var day		= date.date();
			if( day < 10 ) day = "0"+day
			
			var s3host				= "https://s3.amazonaws.com/ojo-workshop/modis_af/" + year + "/" + jday + "/"
			var browse_img_url		= s3host+"South_Asia_24h_thn.jpg"
			var geoojson_url		= s3host+"South_Asia_24h.geojson"
			
			res.render("products/modis_af", {
				social_envs: 	app.social_envs,
				description: 	req.gettext("legend.active_fires.title") +" - "+date.format("YYYY-MM-DD"),
				image: 			browse_img_url,
				url: 			host+"/products/modis_af/browse/"+year+"/"+doy,
				map_url: 		host+"/products/modis_af/map/"+year+"/"+doy,
				date: 			date.format("YYYY-MM-DD"),
				region: 		region,
				data: 			"https://earthdata.nasa.gov/data/near-real-time-data/firms/active-fire-data",
				topojson: 		geoojson_url,
				layout: 		false
			})
		},

		map: function(req,res) {
			var year 	= req.params['year']
			var doy 	= req.params['doy']
			var date 	= moment(year+"-"+doy)
			var host 	= "http://"+req.headers.host
			var bbox	= bbox
			var id		= year+"-"+doy
			
			var region 	= {
				name: 	req.gettext("legend.active_fires.title")+" "+date.format(req.gettext("formats.date")),
				scene: 	id,
				bbox: 	undefined,	// feature.bbox,
				target: target,
				min_zoom: 6
			}
			var url = "/products/modis_af/query/"+year+"/"+doy
			render_map(region, url, req, res )
		},
		
		query: function(req, res) {
			var year 		= req.params['year']
			var doy 		= req.params['doy']
			var user		= req.session.user
			var credentials	= req.session.credentials
			
			query_af.QueryByID(req, user, year, doy, credentials, function(err, entry) {
				res.send(entry)
			}) 
		},
		
		process: function(req,res) {
	
		}
	};