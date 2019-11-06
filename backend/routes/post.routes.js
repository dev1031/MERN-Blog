const express = require('express');
const router = express.Router();
const Post = require('./../models/Posts');

router.get('/' , (req, res)=>{
    Post.find()
    .then((response)=>{
        res.status(200).json({
            response: response
        })
    })
    //res.send('You are inside the Posts get')
})

router.post('/',(req, res)=>{
    var topic = req.body.topic;
    var about = req.body.about;
    var _id = req.body._id;
    var post = new Post({topic , about ,_id});
    post.save()
    .then((response)=>{
        if(err){
            res.send("err" , err)
        }
        console.log(response);
    })
    res.send('Post Created');
})

module.exports = router