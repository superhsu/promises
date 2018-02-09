/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */
var request = require('request');
var fs = require('fs');
var Promise = require('bluebird');
var db = {};
Promise.promisifyAll(db);

db.readFileFunc = function(readFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, null, function(err, data) { 
    resolve(data.toString().split('\n')[0]);
  });
  });
};

db.requestUserData = function(data) {
  return new Promise((resolve, reject) => {
    request('https://api.github.com/users/' + data, (err, res)=>{
      resolve(res);
    });
  });
};

db.writeFileFunc = function(writeFilePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(writeFilePath, JSON.stringify(data), (err)=> {});
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return function(){
    return db.readFileFunc(readFilePath);
  }()
    .then(function(data){
      return db.requestUserData(data);
    })
    .then(function(data) {
      return db.writeFileFunc(writeFilePath, data);
    })

  
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
