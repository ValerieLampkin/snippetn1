var parameters = {
		"apikey" : "",
		"url" : "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/first-family/44_barack_obama%5B1%5D.jpg" 
};

//Main function
//Output will be reflected via console.log function
function handler(req_parameters, callback) {
	var watson = require('watson-developer-cloud');
	var fs = require('fs');
	var http = require('http');

	var visual_recognition = new watson.VisualRecognitionV3({
		api_key: req_parameters.apikey, //SET YOUR API KEY
		version_date: '2015-05-20'
	});
	
	visual_recognition.detectFaces(parameters, (err, response) => {
		if (err) {
			console.log('error:', err);
			if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
		}
		else {
			console.log(JSON.stringify(response, null, 2));
			if (typeof callback !== 'undefined' && typeof callback=="function") return callback(response);
		}
	});
}


//Allows Execution of this handler
//will run if only called directly
if (require.main === module) {
	handler(parameters,null);
} else {

//	name of the unit for logging and servlet path also
	var unitpath = "";

//	Template for making above code available
//	as service via superglue routine
	var superglue = require('sandbox-superglue');
	module.exports = {
			path: '/'+unitpath,
			priority: 1,

			init: function (app) {
				// something to do initially
			},
			GET:  function(req, res) {superglue.GET(req,res,parameters,unitpath)},
			POST: function(req, res) {superglue.POST(req,res,handler)}
	}
}