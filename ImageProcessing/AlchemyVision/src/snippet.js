//Predefined parameters
//which may contain api_key, username, password 
var parameters = {
		"apiKey"	: "913f155354acfc4810935b58249e5edefa63f9ba",
		"imageUrl"	: "http://thelibertarianrepublic.com/wp-content/uploads/2016/02/140718-barack-obama-2115_86aea53294a878936633ec10495866b6.jpg"
};

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
	var watson = require('watson-developer-cloud');
	var http = require('http');
	var request = require('request');
	var fs = require('fs');

	var alchemy_vision = watson.alchemy_vision({
		"api_key" : req_parameters.apiKey
	});
	
	var localImage = "pic.jpg";
	request.head(req_parameters.imageUrl, function(err, res, body){
		if (err) {
			console.log('error:', err);
			if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
		}
		
		request(req_parameters.imageUrl).pipe(fs.createWriteStream(localImage)).on('close', function() {
			var input = {
					"image" : fs.createReadStream(localImage)
			};

			alchemy_vision.getImageKeywords(input, function (err, response) {
				if (err) {
					console.log('error:', err);
					if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
				} else {
					console.log(JSON.stringify(response, null, 2));
					if (typeof callback !== 'undefined' && typeof callback=="function") return callback(response);
				}
			});
		});
	});
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