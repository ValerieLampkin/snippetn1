var parameters = {
  apikey: '',
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
	
	var watson = require('watson-developer-cloud');
	var alchemy_language = watson.alchemy_language({
	  version: 'v2',
	  api_key: req_parameters.apikey // SET YOUR API KEY
	});

	alchemy_language.sentiment(req_parameters, function (err, response) {
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