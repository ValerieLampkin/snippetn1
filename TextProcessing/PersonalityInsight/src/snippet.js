//Predefined parameters
//which may contain api_key, username, password 
var params = {
		"username" : "e99c66c3-7ffd-4001-8bff-d57d218d7461",
		"password" : "dcb7G7Z3MrWE",
		"api_key" : "913f155354acfc4810935b58249e5edefa63f9ba",
		"url" : "https://simple.wikipedia.org/wiki/Barack_Obama"
};

var watson = require('watson-developer-cloud');
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI(params.api_key);
alchemy.text(params.url, {}, function(err, response) {
	if (err) {
		console.log('error: ' + err);
		return;
	}

	var personality_insights = watson.personality_insights({
		username: params.username,
		password: params.password,
		version: 'v2'
	});

	personality_insights.profile({
		text: response.text,
		language: 'en' },
		function (err, response) {
			if (err)
				console.log('error:', err);
			else
				console.log(JSON.stringify(response, null, 2));
		});

});

////////
//Main function
//Output will be reflected via console.log function
function process(reqparams, callback) {
	var AlchemyAPI = require('alchemy-api');

	var alchemy = new AlchemyAPI(reqparams.api_key);

	// Personality Insights using Watson Lib
	var out = {};
	alchemy.text(reqparams.url, {}, function(err, response) {
		if (err) {
			console.log('error: ' + err);
			if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
			return;
		}
		
		var personality_insights = watson.personality_insights({
			username: reqparams.username,
			password: reqparams.password,
			version: 'v2'
		});

		personality_insights.profile({text: response.text, language: 'en'},
			function (err, response) {
				if (err) {
					console.log('error: ' + err);
					if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
					return;
				} else {
					console.log(JSON.stringify(response, null, 2));
					if (typeof callback !== 'undefined' && typeof callback=="function") return callback(response);
				}
			}
		);
	});
}

//Allows Execution of this process
//will run if only called directly
if (require.main === module) {
	process(params,null);
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
			GET:  function(req, res) {superglue.GET(req,res,params,unitpath)},
			POST: function(req, res) {superglue.POST(req,res,process)}
	}
}