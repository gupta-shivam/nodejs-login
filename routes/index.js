var express = require('express');
var fs = require('fs');
var http  = require('http');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../lib/User.js');
mongoose.connect('mongodb://localhost/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

router.get('/login',function (req,res) {
   res.render('login',{title: 'login'});

});

router.get('/register',function (req,res) {
    res.render('register',{title: 'register'});

});

router.get('/logout',function (req,res) {
    req.session.destroy();
    res.render('login',{title: 'register'});

});

router.post('/login',function (req,res) {
    var username =req.body.username;
    var password =req.body.password;
     User.findOne({username: username, password: password}, function (err,user) {
        if(err){
            console.log(err);
            return res.status(500).send("fucking error ");
        }

        if(!user){
            return res.status(404).send("no such user");
        }

        req.session.user =user;
        return res.render('loggedin',{User:user , title: 'loged in'});
    })


});




router.post('/register', function (req,res) {

    var username =req.body.username;
    var password =req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var newuser = new User();
    newuser.username = username;
    newuser.password =password;
    newuser.firstname =firstname;
    newuser.lastname =lastname;
    newuser.save(function (err, savedUser) {
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        return res.status(200).send();
    })

});


module.exports = router;
