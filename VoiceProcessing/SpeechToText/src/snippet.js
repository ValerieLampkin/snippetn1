//Predefined parameters
//which may contain api_key, username, password 
var parameters = {
		"username" : "90260bbe-07af-47ee-abe3-bb6199e4ed1d",
		"password" : "2aIQdfh6KFCx",
		"wav_file" : '/home/vcap/app/public/STTInput.wav',
		"output_file" : '/home/vcap/app/public/output.txt' // 'audio/l16; rate=44100'
};

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
	var watson = require('watson-developer-cloud');
	var fs = require('fs');

	var speech_to_text = watson.speech_to_text({
		username: req_parameters.username,
		password: req_parameters.password,
		version: 'v1'
	});
	
	var audio = {
			audio: fs.createReadStream(req_parameters.wav_file),
			content_type: 'audio/l16; rate=44100'
	};

	speech_to_text.recognize(audio, function(err, response) {
		if (err) {
			console.log('error:', err);
			if (typeof callback !== 'undefined' && typeof callback=="function") return callback(err);
		} else {
			console.log(JSON.stringify(response, null, 2));
			if (typeof callback !== 'undefined' && typeof callback=="function") return callback(response);
		}
	});

	//streaming working
	fs.createReadStream(req_parameters.wav_file)
	.pipe(speech_to_text.createRecognizeStream({ content_type: audio.content_type }))
	.pipe(fs.createWriteStream(req_parameters.output_file));

	//Access Output at  <hostname>/output.txt  or /output.wav
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