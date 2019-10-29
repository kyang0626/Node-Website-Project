

module.exports = function (app) {
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
    app.get('/family', function (req, res) {
        res.render('family: john');
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
}
