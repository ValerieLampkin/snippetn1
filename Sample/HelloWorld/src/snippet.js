//Predefined parameters
//which may contain api_key, username, password 
var params = {
		"message" : "hello world!"
};

//Main function
//Output will be reflected via console.log function
function process(reqparams, callback) {
	console.log(JSON.stringify(reqparams, null, 2));
	if (typeof callback !== 'undefined' && typeof callback=="function") return callback(reqparams);
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
//	var superglue = require('../lib/superglue.js');
	module.exports = {
			path: '/'+unitpath,
			priority: 1,

			init: function (app) {
				// something to do initially
			},
			GET:  function(req, res) {res.send(params);},
			POST: function(req, res) {res.send(params);}
	}
}