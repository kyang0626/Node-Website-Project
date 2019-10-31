var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var port = process.env.PORT || 3000;

// app.use(express.static("public"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var content = require('./content.json');
// console.log(content);

// MySql Connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'guestbook_db'
});

// ===============    Routes ===============
app.use('/public', express.static(__dirname + '/public'));


app.set('view engine', 'ejs');

// render pages
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/aboutme', function (req, res) {
    res.render('aboutme');
})
app.get('/family', function (req, res) {
    res.render('family');
})
app.get('/contact', function (req, res) {
    res.render('contact');
})
app.get('/contact', function (req, res) {
    res.render('contact');
})

// get JSON by params 
app.get('/family/:id', function (req, res) {
    var family_member_info = [content];
    // console.log(family_member_info);
    res.render('familyMember', { name: req.params.id, familyMember: family_member_info, gender: family_member_info, occupation: family_member_info, pic: family_member_info });

});

app.get('/guestbook', function (req, res) {
    con.query("SELECT name, email, comment, time FROM people", function (err, result) {
        if (err) throw err;
        res.render('guestbook', { q_result: result });
    });
})

app.get('/success', function (req, res) {
    res.render('success');
    console.log(res);
})

// api
app.get('/api/', function (req, res) {
    res.json(content);
})
app.get('/api/:id', function (req, res) {
    var page = req.params.id;
    console.log(req.params.id);
    console.log(page);
    res.json(content.page);

})
// Submit Form
app.post("/contact", urlencodedParser, function (req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.comment);
    var timeSubmit = new Date().toLocaleTimeString();
    console.log(timeSubmit);

    if (req.body.name == "" || !req.body.email || !req.body.comment) {
        res.status(500);
        res.render('error', 'form info is missing, submit name, email, and a comment');
    }

    // Insert
    con.query("INSERT INTO people (name, email, comment, time) VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.comment + "', '" + timeSubmit + "')", function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    res.redirect("success");

});



app.listen(port);

