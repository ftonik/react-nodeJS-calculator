var React = require('react');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {title: 'Calculator'});
    });

};