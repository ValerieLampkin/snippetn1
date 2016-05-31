//Predefined parameters
//which may contain api_key, username, password 
var params = {
		"api_key" : "913f155354acfc4810935b58249e5edefa63f9ba",
		"url" : "https://simple.wikipedia.org/wiki/Barack_Obama"
};

//Main function
//Output will be reflected via console.log function
function process(reqparams, callback) {
	var AlchemyAPI = require('alchemy-api');

	var alchemy = new AlchemyAPI(reqparams.api_key);

	// Sentiment , Entities, Relations using Alchemy Lib
	var out = {};
	alchemy.sentiment(reqparams.url, {}, function(err, response) {
		if (err) {
			console.log('error: ' + err);
			if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
			return;
		}
		out.sentiment = response.docSentiment;

		alchemy.entities(reqparams.url, {}, function(err, response) {
			if (err) {
				console.log('error: ' + err);
				if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
				return;
			}
			out.entities = response.entities;

			alchemy.relations(reqparams.url, {}, function(err, response) {
				if (err) {
					console.log('error: ' + err);
					if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
					return;
				}
				out.relations = response.relations;

				console.log(JSON.stringify(out, null, 2));
				if (typeof callback !== 'undefined' && typeof callback=="function") return callback(response);
			});

		});

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