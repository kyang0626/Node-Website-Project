var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var port = process.env.PORT || 3000;

// app.use(express.static("public"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var sibling = require('./views/famMember.json');

// ===============    Routes ===============
app.use('/public', express.static(__dirname + '/public'));


app.set('view engine', 'ejs');

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
app.get('family/:id', function (req, res) {
    res.render('person', { id: req.params.id });
})
// get JSON by params 
app.get('/family/:id', function (req, res) {
    console.log(req);
    res.json({ sibling: sibling.siblings.firstSibling });
    res.json({ sibling: sibling.siblings.secondSibling });
    res.json({ sibling: sibling.siblings.thirdSibling });

});


// app.post('/person', urlencodedParser, function (req, res) {
//     console.log('hello!');
//     res.send("Thank you!");
//     console.log(req, res, firstname);
//     console.log(req, res, lastname);
// }

app.post("/contact", urlencodedParser, function (req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.comment);


    // MySql Connection
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'guestbook_db'
    });

    con.query('SELECT * FROM guestbook_db.people',
        function (err, rows) {
            if (err) {
                res.status(500);
                throw err
            };
        })


    // Insert
    con.query("INSERT INTO people (name, email, comment) VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.comment + "')", function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

})


app.listen(port);

