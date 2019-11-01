var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var port = process.env.PORT || 3000;

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(fileUpload());

// ===============    Routes ===============
var contactController = require('./controller/contact.js');
contactController(app);

var familyController = require('./controller/family.js');
familyController(app);

// render pages
app.get('/', function (req, res) {
    resArray = [];
    var weather = require("weather-js");
    weather.find({ search: "Raleigh, NC", degreeType: "F" }, function (err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        console.log(result);

        // === Displaying result onto page ====

        // var getResult = result;
        // getResult.each(function (err, res) {
        //     resArray.push(res);
        //     console.log(resArray);
        // });
    });

    res.render('index');
});

app.get('/aboutme', function (req, res) {
    res.render('aboutme');
})

app.get('/guestbook', function (req, res) {
    var resultArray = [];
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://yangk93:koobyaj828@cluster0-w1hli.mongodb.net/test?retryWrites=true&w=majority"

    MongoClient.connect(uri, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('MongoDB sucessfully connected!!.....');
        const collection = client.db("guestbook_db").collection("people");
        var cursor = collection.find();
        cursor.each(function (err, doc) {
            console.log(resultArray);
            resultArray.push(doc);
            client.close();
            res.render('guestbook', { q_result: resultArray });
        });
    });
});

app.get('/success', function (req, res) {
    res.render('success');
    console.log(res);
})

var apiController = require('./controller/api.js');
apiController(app);

app.listen(port);