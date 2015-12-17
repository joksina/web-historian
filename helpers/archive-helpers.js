var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //takes a callback
  //read the file *exports.paths.list, 
  //set data to string and split at new line
  //check if it is a callback
  //invoke callback on data
  fs.readFile(exports.paths.list,"utf8", function(err,contents){
    siteData = contents.split("\n");
    if(callback) {
      callback(siteData);
    }
  });

};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(arrContents){
    var exist =_.any(arrContents, function(website){
      return website.match(url);
    });
    callback(exist);
  });

  //takes url and callback
  //export the readlistUrl.. it takes one parameter
  //we can use _.any to check if the site match any url
  //return site.match url
  //invoke 
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + "\n", function(err){
    if (err) throw err;
    callback();
  });
};

exports.isUrlArchived = function(path, callback) {
  fs.exists(exports.paths.archivedSites + path, function(exists){
    //If true invoke
    callback(exists);  
  });



};

exports.downloadUrls = function(arrSites) {
  _.each(arrSites, function(site){
    fs.closeSync(fs.openSync(exports.paths.archivedSites + "/" + site, "w"));
  });
};









