var express = require("express");
var router = express.Router();

var pg = require("pg");

var config = { database: "task_app" };

// initialize connection Pool


var pool = new pg.Pool(config);

router.get("/", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query("SELECT * FROM tasks;", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/', function(req, res){
  pool.connect(function(err, client, done){
    console.log(req.body);
    if (err){
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      //no error occurred, time to query

      // 1. sql string--the actual SQL query we want to running
      // 2. array of data--any data we want to pass to a parameterized statement
      // 3..callback --function to run after the database gives us our result
      //       takes an error onject and the result object as it's args
      client.query('INSERT INTO tasks (task, status) VALUES ($1, $2) RETURNING *;',
      [req.body.task_input, req.body.status],
      function(err, result){
        //waiting for database to get information back
        done();
        if(err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }else{
          console.log('Got info from DB', result.rows);
          res.send(result.rows);
        }

      })

    }
  });
});

module.exports = router;
