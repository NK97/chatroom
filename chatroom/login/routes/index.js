var express = require('express');
var router = express.Router();

var loginCheck = function(req, res, next) {
    if(req.session.user){
        next();
    }else{
        res.redirect('login');
    }
};

router.get('/', loginCheck, function(req, res) {
    res.render('index', { user: req.session.user});
});

module.exports = router;
