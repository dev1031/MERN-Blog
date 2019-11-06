const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required : true
    },
    email :{
        type: String,
        trim: true,        
        required : true,
        unique : true

    },
    password :{
        type: String,
        trim: true,
        required : true

    }

},{
    timestamps : true

})

var User =  mongoose.model('User' , userSchema);

module.exports = User;