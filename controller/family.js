var express = require('express');
var app = express();
var content = require('../content.json');

module.exports = function (app) {
    app.get('/family', function (req, res) {
        res.render('family');
    })
    // get JSON by params 
    app.get('/family/:id', function (req, res) {
        var family_member_info = content.family.siblings[req.params.id];
        console.log(family_member_info);
        res.render('familyMember', { name: req.params.id, familyMember: family_member_info });
    });
}
