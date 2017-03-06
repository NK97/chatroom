var express = require('express');
var router = express.Router();
var model = require('../model');
var User = model.User;

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var query = {
        "email": email,
        "password": password
    };
    User.find(query, function(err, data) {
        if (err) {
            console.log(err);
        }
        if (data === "") {
            res.render('login');
        } else {
            req.session.user = email;
            res.redirect('/');
        }
    });
});

module.exports = router;
