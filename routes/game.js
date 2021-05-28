var express = require("express");
const passport = require("passport");
var router = express.Router();
var User = require("../models/User");
var middleware = require("../middleware/index");
var {isLoggedIn} = middleware;
var questions = require('../middleware/Questions');
const { authenticate } = require("passport");
var que = new questions();
router.get('/user', isLoggedIn, (req, res) => {
    var data = {
        question:que.Arr[req.user.level],
        score: req.user.score
    };
    res.render('Game/user',{data});
});

router.get('/rankings', (req, res) => {
    var result ;
    User.find().sort({score:-1}).exec((err, done) => {
        if(err) console.log("err: "+err);
        else {console.log(done);
            result = done}
            res.render('Game/leaderboard', {result});
    } );
    
});

router.get('/about', (req, res) => {
    res.render('Game/about');
});

router.post('/update', (req, res) => {
    var uscore = req.user.score + 50;
    var ulevel = req.user.level + 1;
    if(que.Arr[req.user.level].ans === req.body.response) {
        User.findOneAndUpdate({username: req.user.username}, {score: uscore, level: ulevel}, (err, done) => {
            if(err) console.log("err: "+err);
            else console.log("done: "+done);
        })
    }
    res.redirect('/Game/user');
});


module.exports = router;
