//Predefined parameters
//which may contain api_key, username, password 
var parameters = {
		"username" : "",
		"password" : "",
		"url" : "https://simple.wikipedia.org/wiki/Barack_Obama"
};

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
	var watson = require('watson-developer-cloud');

	var concept_insights = watson.concept_insights({
	  username: req_parameters.username, // SET YOUR USERNAME
	  password: req_parameters.password, // SET YOUR PASSWORD
	  version: 'v2'
	});
	var params = {
	  graph: '/graphs/wikipedia/en-20120601',
	  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
	};

	// Retrieve the concepts for input text
	concept_insights.graphs.annotateText(params, function(err, res) {
	  if (err)
	    console.log(err);
	  else {
	    console.log('Annotated Text');
	    console.log(JSON.stringify(res, null, 2));
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