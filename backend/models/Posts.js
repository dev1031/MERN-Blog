const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    topic : {
        type: String,
        trim: true,
        required : true
    },
    about :{
        type: String,
        trim: true,        
        required : true
    },  
    postedBy: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }]

},{
    timestamps : true

})

var Post =  mongoose.model('Post' , postSchema);

module.exports = Post;