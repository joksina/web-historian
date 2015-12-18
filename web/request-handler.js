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
    action.POST(url.parse(req.url).pathname, req,res);
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
          sendResponse(res, "Not Found", 404); 
        }
      });
    }
  },
  'POST': function(path, req, res) {      
    var decodedResults = '';
    req.on('data', function(chunk){
      decodedResults += chunk;
    });
    req.on('end', function(){
      decodedResults = decodedResults.split('=')[1];

      // archive.isUrlInList(decodedResults, function(found){
      //   if(found) {
      //     archive.isUrlArchived(decodedResults, function(exists){
      //       if(exists) {
      //         sendResponse(res, "/" + url);
      //       }
      //     });
      //   }
      // });

        // console.log(contents);
      archive.isUrlArchived(decodedResults, function(exists){
        fs.readFile(decodedResults, function(err, contents) {
          sendResponse(res, contents, 302);
        });
      });
      //if it does exist in list
      archive.isUrlInList(decodedResults, function(exists){
        fs.readFile(archive.paths.siteAssets + "/loading.html", function(err, contents) {
          sendResponse(res, contents, 302);
        });
      });
      //if it doesn't, add to list
      archive.addUrlToList(decodedResults, function(){
        fs.readFile(archive.paths.siteAssets + "/loading.html", function(err, contents) {
          sendResponse(res, contents, 302);
        });        
      });
    
    // });
    // archive.readListOfUrls(function(array){
    //   array = array.slice(0, array.length - 1);
    //   archive.downloadUrls(array);
    });
  },
  'OPTION': function() {

  }
};


  // 'POST': function(request, response) {
  //   fs.readFile(request, function(data) {
  //     var url = data.split('=')[1].replace('http://', '');
  //     // check sites.txt for web site
  //     archive.isUrlInList(url, function(found) {
  //       if (found) { // found site
  //         // check if site is on disk
  //         archive.isUrlArchived(url, function(exists) {
  //           if (exists) {
  //             // redirect to site page (/www.google.com)
  //             helpers.sendRedirect(response, '/' + url);
  //           } else {
  //             // Redirect to loading.html
  //             helpers.sendRedirect(response, '/loading.html');
  //           }
  //         });
  //       } else { // not found
  //         // add to sites.txt
  //         archive.addUrlToList(url, function() {
  //           // Redirect to loading.html
  //           helpers.sendRedirect(response, '/loading.html');
  //         });