//Predefined parameters
//which may contain api_key, username, password 
var parameters = {
		"message" : "hello world!"
};

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
	console.log(JSON.stringify(req_parameters, null, 2));
	if (typeof callback !== 'undefined' && typeof callback=="function") return callback(req_parameters);
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
//	var superglue = require('../lib/superglue.js');
	module.exports = {
			path: '/'+unitpath,
			priority: 1,

			init: function (app) {
				// something to do initially
			},
			GET:  function(req, res) {res.send(parameters);},
			POST: function(req, res) {res.send(parameters);}
	}
}