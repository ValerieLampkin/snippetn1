'use strict';
var watson = require('watson-developer-cloud');
var tone_analyzer = watson.tone_analyzer({  
  username: '', // SET YOUR USERNAME
  password: '', // SET YOUR PASSWORD
  version: 'v3',
  version_date: '2016-05-19'
});
tone_analyzer.tone({ text: "I know the times are difficult! Our sales have been "
          + "disappointing for the past three quarters for our data analytics "
          + "product suite. We have a competitive data analytics product "
          + "suite in the industry. But we need to do our job selling it! "
          + "We need to acknowledge and fix our sales challenges. "
          + "We can’t blame the economy for our lack of execution! "
          + "We are missing critical sales opportunities. "
          + "Our product is in no way inferior to the competitor products. "
          + "Our clients are hungry for analytical tools to improve their "
          + "business outcomes. Economy has nothing to do with it." },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
});