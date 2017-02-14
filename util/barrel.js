var exports = module.exports = {};

exports.express = require('express')
exports.MongoClient = require('mongodb').MongoClient
//Required to be able to use posted form data
exports.bodyParser= require('body-parser')
exports.app = exports.express()
exports.colors = require('colors/safe')
exports.routes = require('./routes');
exports.badgesSvc = require('../services/badgeService');