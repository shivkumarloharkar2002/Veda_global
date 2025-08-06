const mongoose = require("mongoose");
const Userchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique: true,
    },
    address:{
        type:String,
    },
    password:{
        type:String,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
}, {timestamps:true});

const User = mongoose.model("user", Userchema);

module.exports = User;