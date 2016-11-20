'use strict';
var URL = require("url");
var AWS = require('aws-sdk');
var fs = require("fs");
var path = require('path');
var Promise = require("bluebird");

Promise.promisifyAll(require("fs"));
var s3 = new AWS.S3();
Promise.promisifyAll(Object.getPrototypeOf(s3));


/**
 * Don't hard-code your credentials!
 * Export the following environment variables instead:
 *
 * export AWS_ACCESS_KEY_ID='AKID'
 * export AWS_SECRET_ACCESS_KEY='SECRET'
 */

// Set your region for future requests.
AWS.config.region = 'us-east-1';

var _uploadText = function (bucket, path, text, fileName) {
    var s3bucket = new AWS.S3({params: {Bucket: bucket}});
    var fileKey = path + '/' + fileName;
    //ACL:'public-read';
    var params = {Key: fileKey, Body: text};
    return s3bucket.uploadAsync(params).then(function (data) {
        return data;
    });
};

var _readText = function(bucket, path, fileName){
    var s3bucket = new AWS.S3({params: {Bucket: bucket}});
    var fileKey = path + '/' + fileName;
    var params = {Bucket: bucket, Key: fileKey};
    return s3.getObjectAsync(params).then(function(data) {
        return data.Body.toString();
    });
};

var _readJSON = function(bucket, path, fileName){
    return _readText(bucket, path, fileName).then(function(data){
        return JSON.parse(data);
    });
};


/* creates a bucket on from s3
 * @param {String} bucket - the name of the bucket
 * @return {Object} the response object
 * */
var _createBucket = function (bucket) {
    var s3bucket = new AWS.S3({params: {Bucket: bucket}});
    return s3bucket.createBucketAsync().then(function () {
        return true;
    });
};

/* deletes a file from s3
 * @param {String} url - the url for the aws object
 * @return {Object} the response object
 * */
var _deleteFile = function (url) {
    if(url && url.length){
        var parts = _parseAwsURLParts(url);
        var params = {
            Bucket: parts.bucket,
            Key: parts.key
        };
        return s3.deleteObjectAsync(params).then(function (data) {
            return data
        });

    }
    else{
        return Promise.try(function(){
            return "no file existed";
        });
    }
};

/* parses the AWS parts for a an awsURL
 * @param {String} awsUrl - the url for the aws object
 * @return {Object} the bucket and key
 * */
var _parseAwsURLParts = function (awsUrl) {
    var parts = URL.parse(awsUrl);
    var p = parts.path.substring(1);
    var bucket = p.substring(0, p.indexOf('/'));
    var key = p.substring(bucket.length + 1);
    return {bucket: bucket, key: key};
};


module.exports = {
    createBucket: _createBucket,
    uploadText: _uploadText,
    readText: _readText,
    readJSON:_readJSON,
    deleteFile: _deleteFile,
    getBucketInfoFromUrl: _parseAwsURLParts,
};
