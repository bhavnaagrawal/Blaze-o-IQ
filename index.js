var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    session       = require("express-session"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/User")


var app = express();
app.set("view engine", 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use('/Game' , express.static('public'));

// connecting to dbms 
var URI = "mongodb://127.0.0.1:27017/xumbao";
mongoose.connect(URI,{ useNewUrlParser: true , useUnifiedTopology: true })
.then( res => {
    console.log("Connected to db");
    app.listen(3000, () => console.log("Server is Started!"));
})
.catch(err => console.log(err));


// routers
var auth = require('./routes/auth.js');
var game = require('./routes/game.js');

app.use(
    session({
        secret: "This is a secret",
        resave: false,
        saveUninitialized: false
    })
);

// passport initializing
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // console.log(req.user);
    //res.locals.success = req.flash('success');
    //res.locals.error = req.flash('error');
    next();
 });



app.get('/', (req,res) => {
    res.render('index');
})

app.use('/auth', auth);
app.use('/game',game);


