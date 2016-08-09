'use strict';

var watson = require('watson-developer-cloud');

var dialog = watson.dialog({
  username: '', // SET YOUR USERNAME
  password: '', // SET YOUR PASSWORD
  version: 'v1'
});

dialog.getDialogs({}, function (err, dialogs) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(dialogs, null, 2));
});