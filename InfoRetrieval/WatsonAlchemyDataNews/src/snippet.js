//Predefined parameters
//which may contain api_key, username, password 
var params = {
		"api_key" : "913f155354acfc4810935b58249e5edefa63f9ba",
		"start"	: "now-1d",
		"end"	: "now",
		"count"	: 1,
		"return" : "enriched,original"
};

//Main function
//Output will be reflected via console.log function
function process(reqparams, callback) {
	var watson = require('watson-developer-cloud');

	var alchemy_data_news = watson.alchemy_data_news({
		"api_key" : reqparams.api_key
	});

	alchemy_data_news.getNews(reqparams, function (err, response) {
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