const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {

  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }, 

    //https://api.github.com/users/octocat/repos?access_token=0b560dd904ab1fd11e6d3d4f8e2b2f7acc1f7180
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log('error:', error); 
      callback(error, null)
    } else {
      console.log('statusCode:', response.statusCode); 
      console.log('here is the response body from github', body);
      let parsedBody = JSON.parse(body);
      callback(null, parsedBody); 
    }
});
  

}

// getReposByUsername('octocat');

module.exports.getReposByUsername = getReposByUsername;