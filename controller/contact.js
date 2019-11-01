var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yangk93:koobyaj828@cluster0-w1hli.mongodb.net/test?retryWrites=true&w=majority"
const fileUpload = require('express-fileupload');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    app.get('/contact', function (req, res) {
        res.render('contact');
    })
    // Submit Form
    app.post("/contact", urlencodedParser, function (req, res) {
        var timeSubmit = new Date().toLocaleTimeString();
        app.use(fileUpload());

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
            // ======= File Upload ============
            var imageFile = req.files.imageFile;
            // console.log(imageFile);
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
        });

        res.redirect("success");

    });
}


