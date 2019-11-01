var express = require('express');
var app = express();
var content = require('../content.json');

module.exports = function (app) {
    // api
    app.get('/api/content', function (req, res) {
        res.json(content);
    })
    app.get('/api/content/:id', function (req, res) {
        var page = [content]
        console.log(req.params.id);
        res.json(req.params.id)
    })
}