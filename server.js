var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

// ===============    Routes ===============
app.use('/assets', express.static(__dirname + '/public'));

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
    res.render('person', { ID: req.params.id });
})
app.get('/api', function (req, res) {
    req.json({ firstname: 'John', lastname: 'Doe' });
})
app.post('/person', urlencodedParser, function (req, res) {
    res.send("Thank you!");
    console.log(req, res, firstname);
    console.log(req, res, lastname);
})


app.listen(port);

