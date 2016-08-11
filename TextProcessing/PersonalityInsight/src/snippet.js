//Predefined parameters
//which may contain api_key, username, password 
var parameters = {
		"username" : "",
		"password" : "",
		"text" : "Call me Ishmael. Some years ago-never mind how long "
		      + "precisely-having little or no money in my purse, and nothing "
		      + "particular to interest me on shore, I thought I would sail about "
		      + "a little and see the watery part of the world. It is a way "
		      + "I have of driving off the spleen and regulating the circulation. "
		      + "Whenever I find myself growing grim about the mouth; whenever it "
		      + "is a damp, drizzly November in my soul; whenever I find myself "
		      + "involuntarily pausing before coffin warehouses, and bringing up "
		      + "the rear of every funeral I meet; and especially whenever my "
		      + "hypos get such an upper hand of me, that it requires a strong "
		      + "moral principle to prevent me from deliberately stepping into "
		      + "the street, and methodically knocking people's hats off-then, "
		      + "I account it high time to get to sea as soon as I can."
};


//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {

	var watson = require('watson-developer-cloud');
	
	var personality_insights = watson.personality_insights({
		  username: req_parameters.username, // SET YOUR USERNAME
		  password: req_parameters.password, // SET YOUR PASSWORD
		  version: 'v2'
		});
	
	// Personality Insights using Watson Lib
	personality_insights.profile({
		  text: req_parameters.text},
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