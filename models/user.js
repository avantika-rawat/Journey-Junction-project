const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//we are not adding username to schema and its just email as passportLocalMongoose automatically adds it to the schema, we just have to require and add plugin

const userSchema = new Schema({
    email : {
        type :String,
        required : true
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);