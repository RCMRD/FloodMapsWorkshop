var util 			= require('util'),
	fs				= require('fs'),
	async	 		= require('async'),
	path			= require('path'),
	moment			= require('moment'),
	request			= require('request'),
	//xml2js 			= require('xml2js'),
	_				= require('underscore'),
	mime			= require('mime-types'),
	mkdirp			= require('mkdirp'),
	Hawk			= require('hawk'),
	query_pop		= require("../lib/query_pop"),

	debug			= require('debug')('pop');
	
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
	
	function sendFile( res, file ) {
		var ext 		= path.extname(file)
		var basename 	= path.basename(file)
		var dirname 	= path.dirname(file)
		var ext			= path.extname(file)
	
		var mime_type = mime.lookup(path.basename(file))
		//console.log("sendFile", file, ext, mime_type)
	
		if( (basename.indexOf(".topojson.gz") > 0) || (basename.indexOf(".geojson.gz") > 0) ) {
			res.header("Content-Type", "application/json")
			res.header("Content-Encoding", "gzip")
			//console.log("sending .topojson application/json gzip", basename)
		} else {
			//console.log("sending ", mime_type, basename, dirname)
			res.header("Content-Type", mime_type, basename)
			debug(ext, mime_type, "no encoding")
		}
		res.header("Access-Control-Allow-Origin", "*")
		res.sendFile(basename, {root: dirname})
	}
	
	module.exports = {

		browse: function(req,res) {
			var year 	= req.params['year']
			var doy 	= req.params['doy']
			var date 	= moment(year+"-"+doy)
			var host 	= "http://"+req.headers.host
			var region 	= {
				name: 	req.gettext("legend.population_count.title"),
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
			
			var s3host				= "https://s3.amazonaws.com/ojo-workshop/ls/2011/"
			var browse_img_url		= s3host+"Pakistan/Pakistan_thn.jpg"
			var topojson_url		= s3host+"Pakistan/Pakistan_levels.topojson"
			var topojson_file		= s3host+"Pakistan/Pakistan_levels.topojson.gz"
			
			res.render("products/pop", {
				social_envs: 	app.social_envs,
				description: 	req.gettext("legend.population_count.title") +" - "+date.format("YYYY-MM-DD"),
				image: 			browse_img_url,
				url: 			host+"/products/pop/browse/"+year+"/"+doy,
				map_url: 		host+"/products/pop/map/"+year+"/"+doy,
				date: 			date.format("YYYY-MM-DD"),
				region: 		region,
				data: 			"http://web.ornl.gov/sci/landscan/",
				topojson: 		topojson_file,
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
				name: 	req.gettext("legend.population_count.title")+" "+date.format(req.gettext("formats.date")),
				scene: 	id,
				bbox: 	undefined,	// feature.bbox,
				target: target,
				min_zoom: 6
			}
			var url = "/products/pop/query/"+year+"/"+doy
			render_map(region, url, req, res )
		},
		
		query: function(req, res) {
			var year 		= req.params['year']
			var doy 		= req.params['doy']
			var user		= req.session.user
			var credentials	= req.session.credentials
			
			query_pop.QueryByID(req, user, year, doy, credentials, function(err, entry) {
				res.send(entry)
			}) 
		},
		
		product: function(req,res) {
			var regionKey	= req.params['subfolder']
			var region		= app.config.regions[regionKey]
			var bucket		= region.bucket

			var subfolder	= 'ls'
			var year 		= req.params['year']
			var id			= req.params['id']			
			 
			// https much slower than http so let's use http
			var s3host		= "http://s3.amazonaws.com/"
			var s3fileName	= s3host + bucket+"/"+subfolder+"/" + year  + "/" + id

			var tmp_dir 	= app.get("tmp_dir")
			var fileName 	= path.join(tmp_dir, bucket, subfolder, year, id)
			var dirName	 	= path.dirname(fileName)
		
		
			if( !fs.existsSync(dirName)) mkdirp.sync(dirName)
			if( fs.existsSync(fileName)) {
				//console.log("return from s3 cache", fileName)
				return sendFile(res, fileName)
			}
		
			var file = fs.createWriteStream(fileName);
			var options = {
				Bucket: bucket, 
				Key: subfolder +"/"+year+"/"+id
			};
		
			try {
				//console.log("copy from s3", options)
				app.s3.getObject(options)
				.createReadStream()
				.pipe(file)
			
				file.on('close', function() {
					//console.log("got file from S3", fileName)
					sendFile(res, fileName)
				});
			
			} catch(e) {
				logger.error("error getting from S3", options, e)
				return res.sendStatus(500)
			}
		},
		
		process: function(req,res) {
	
		}
	};