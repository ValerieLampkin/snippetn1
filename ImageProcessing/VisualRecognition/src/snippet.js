var parameters = {
  "apikey" : "",
  "url" : "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/first-family/44_barack_obama%5B1%5D.jpg" 
};

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
	var watson = require('watson-developer-cloud');
	var fs = require('fs');
	var http = require('http');
	
	var visual_recognition = watson.visual_recognition({
	  api_key: req_parameters.apikey, //SET YOU API KEY
	  version: 'v3',
	  version_date: '2016-05-19'
	});

	visual_recognition.detectFaces(parameters, 
		function (err, response) {
		    if (err) {
		      console.log('error:', err);
		      if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
		    }
		    else {
		      console.log(JSON.stringify(response, null, 2));
				if (typeof callback !== 'undefined' && typeof callback=="function") return callback(response);
		    }
		}
	);
}


//Allows Execution of this process
//will run if only called directly
if (require.main === module) {
	process(parameters,null);
} else {

//	name of the unit for logging and servlet path also
	var unitpath = "";

//	Template for making above code available
//	as service via superglue routine
	var superglue = require('../lib/superglue.js');
	module.exports = {
			path: '/'+unitpath,
			priority: 1,

			init: function (app) {
				// something to do initially
			},
			GET:  function(req, res) {superglue.GET(req,res,parameters,unitpath)},
			POST: function(req, res) {superglue.POST(req,res,process)}
	}
}