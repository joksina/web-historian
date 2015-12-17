var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
};

var sendResponse = function(res, contents, statusCode){
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(contents);
};

exports.handleRequest = function (req, res) {
  
  //check fir req.url
  if (req.method === 'GET'){
    action.GET(url.parse(req.url).pathname, req, res);  
  } else if (req.method === "POST"){
    //Need to search through archived Sites 
    //archive.isURLin
  }
  
};
var action = {
  'GET': function(path, req, res) {
    if (path === "/"){
      fs.readFile(archive.paths.siteAssets + "/index.html", function(err, contents) {
        sendResponse(res, contents, 200);
      });
    } else { 
      fs.exists(archive.paths.archivedSites + path, function(exists){
        if (exists){
          fs.readFile(archive.paths.archivedSites + path, function(err, contents){
            sendResponse(res, contents, 200);
          });
        } else {
          console.log("404");
          sendResponse(res, "Not Found", 404); 
        }
      });
    }
  },
  'POST': function() {

  },
  'OPTION': function() {

  }
};