var parameters = {
		"username" : "",
		"password" : "",
		"text" : "I know the times are difficult! Our sales have been "
	          + "disappointing for the past three quarters for our data analytics "
	          + "product suite. We have a competitive data analytics product "
	          + "suite in the industry. But we need to do our job selling it! "
	          + "We need to acknowledge and fix our sales challenges. "
	          + "We can’t blame the economy for our lack of execution! "
	          + "We are missing critical sales opportunities. "
	          + "Our product is in no way inferior to the competitor products. "
	          + "Our clients are hungry for analytical tools to improve their "
	          + "business outcomes. Economy has nothing to do with it."
}

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
	
	var watson = require('watson-developer-cloud');
	
	var tone_analyzer = watson.tone_analyzer({  
	  username: req_parameters.username, // SET YOUR USERNAME
	  password: req_parameters.password, // SET YOUR PASSWORD
	  version: 'v3',
	  version_date: '2016-05-19'
	});
	
	tone_analyzer.tone({ text: req_parameters.text},
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