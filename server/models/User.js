const mongoose = require("mongoose")

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        reguired:true
    },
    location:{
        type: String,
        reguired:true
    },
    email:{
        type: String,
        reguired:true
    },
    password:{
        type: String,
        reguired:true
    },
        date:{
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model('user',UserSchema)