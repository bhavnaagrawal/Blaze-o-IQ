var express = require("express");
const passport = require("passport");
var router = express.Router();
var User = require("../models/User");


router.get('/signup', (req, res) => {
    res.render('signup');
})

router.post('/signup', (req, res) => {
    var newUser = new User({username: req.body.username, score:0, level:0});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate("local")(req,res, () => {
            res.render('login');
        })
    })
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate("local", {
    successRedirect: "/game/user",
    failureRedirect: "/auth/login"
}), (req, res) => {   
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
})

module.exports = router;