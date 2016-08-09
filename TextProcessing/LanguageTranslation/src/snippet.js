var watson = require('watson-developer-cloud');
var language_translation = watson.language_translator({
  version: 'v2',
  username: '', // SET YOUR USERNAME
  password: '', // SET YOUR PASSWORD
});
language_translation.translate({
    text: 'Boy kicked a ball',
    source: 'en',
    target: 'es'
  }, function(err, translation) {
    if (err)
      console.log(err)
    else
    	console.log(translation);
  }); 