var mongoose = require("mongoose");
var mongooselocal = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema( {
    username: String,
    password: String,
    score: Number,
    level: Number
});

UserSchema.plugin(mongooselocal);

module.exports = mongoose.model("User", UserSchema);