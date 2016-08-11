var parameters = {
		"username" : "",
		"password" : "",
		"text" : "Boy kicked a ball",
		"fromLanguage" : "en",
		"toLanguage" : "es"
}

function process(req_parameters, callback) {
	var watson = require('watson-developer-cloud');
	
	var language_translation = watson.language_translator({
	  version: 'v2',
	  username: req_parameters.username, // SET YOUR USERNAME
	  password: req_parameters.password, // SET YOUR PASSWORD
	});
	
	language_translation.translate({
	    text: req_parameters.text,
	    source: req_parameters.fromLanguage,
	    target: req_parameters.toLanguage
		}, function(err, response) {
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