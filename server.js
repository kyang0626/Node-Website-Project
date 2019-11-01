var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var mysql = require('mysql');

var port = process.env.PORT || 3000;

// app.use(express.static("public"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var content = require('./content.json');

const fileUpload = require('express-fileupload');

app.use(fileUpload());

// ******* No Longer Using MySql ************
// MySql Connection
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'guestbook_db'
// });
// *********************************************

// ========== MongoDB CONNECTION ===================

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://yangk93:koobyaj828@cluster0-w1hli.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri, function (err, client) {
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
    console.log('MongoDB sucessfully connected!!.....');
    const collection = client.db("guestbook_db").collection("people");
    // perform actions on the collection object
    client.close();
});


app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(fileUpload());

// ===============    Routes ===============
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
    var family_member_info = content.family.siblings[req.params.id];
    console.log(family_member_info);
    res.render('familyMember', { name: req.params.id, familyMember: family_member_info });
});

app.get('/guestbook', function (req, res) {
    var resultArray = [];
    const MongoClient = require('mongodb').MongoClient;

    // replace the uri string with your connection string.
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

// api
app.get('/api/content', function (req, res) {
    res.json(content);
})
app.get('/api/content/:id', function (req, res) {
    var page = [content]
    console.log(req.params.id);
    res.json(req.params.id)

})

// Submit Form
app.post("/contact", urlencodedParser, function (req, res) {
    var timeSubmit = new Date().toLocaleTimeString();

    // ======= File Upload ============
    var imageFile = req.files.imageFile;
    // Use the mv() method to place the file somewhere on your server
    imageFile.mv('public/uploads/' + imageFile.name, function (err) {
        if (err) {
            // return res.status(500).send(err);
            console.log('error');
            console.log("Couldn't upload the image file.");
        } else {
            // res.send('File uploaded!');
            console.log("Image file uploaded successfully.");
        }
    });

    MongoClient.connect(uri, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('MongoDB sucessfully connected!!.....');
        const collection = client.db("guestbook_db").collection("people");
        // perform actions on the collection object
        var doc = { name: req.body.name, email: req.body.email, comment: req.body.comment, time: timeSubmit };
        collection.insertOne(doc, function (err, res) {
            if (err) throw err;
            console.log("Document inserted");
            console.log(doc);
            // close the connection to db when you are done with it
            // db.close();
        });
        client.close();
    });


    res.redirect("success");

});

// mongoconnection = mongodb+srv://yangk93:<password>@cluster0-w1hli.mongodb.net/test?retryWrites=true&w=majority


app.listen(port);