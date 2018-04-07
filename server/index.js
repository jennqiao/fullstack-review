const express = require('express');
let app = express();
let parser = require('body-parser');
let morgan = require('morgan'); 
let db = require('../database/index.js');
let helper = require('../helpers/github.js');

app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //collect username's handle
  //get make a get request to github
    //take data from github and save it to the db
  console.log('username', req.body.term);
  let user = req.body.term;

  helper.getReposByUsername(user, (error, results)=> {
    if(error) {
      console.log('error getting repos from API', error);
      res.status(500);
      res.send(error);
    } else {
      db.save(results, (reposAdded, reposUpdated)=> {
        res.send(JSON.stringify([reposAdded, reposUpdated]));
      });      
    }

  } )

  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.getRepos((err, repos) => {
    if (err) {
      res.status(500);
      res.send('error', err);
    } else {
      res.send(JSON.stringify(repos));
    }
  })
});

// let port = 1128;
let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

