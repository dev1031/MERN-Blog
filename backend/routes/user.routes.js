const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./../models/Users');
const jwt = require('jsonwebtoken');
const verifyAuth = require('./../middleware/check-auth');
var JWT_KEY = 'jwtsecrete';

router.get('/users' ,(req, res)=>{
    User.find()
    .select(" name email createdAt ")
    .then((response)=>{
        res.status(200).json({
            response : response
        })
    })
})

router.post('/register',(req, res)=>{
    User.find({email:req.body.email})
    .then((user)=>{
        if(user.length >=1){
            console.log('User Already exist')
            res.send({
                message : 'User Already exist. Try something new'
            })
        }else{
            bcrypt.hash(req.body.password, 10,(err,hash)=>{
                if(err){
                    res.send('Server Error')
                }else{
                    var name = req.body.name;
                    var email = req.body.email;
                    var password = hash;
                    var user = new User ({name, email, password});
                    user.save()
                    .then((response)=>{
                        console.log(response)
                        res.send({
                            message : 'User Created'});
                    })
                }
            })
            
        }
    })
    .catch((err)=>{
        res.status(500).json({err:'error'})
    })
    
})

router.post('/login', (req, res)=>{
    User.find({email: req.body.email})
    .then(user =>{
        if(user.length <1){
            //console.log(user)
            return res.status(401).json({
                message:'Auth Failed'
            });
        }
        bcrypt.compare( req.body.password , user[0].password, (err, result)=>{
            if(err){
                console.log(err)
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    _id: user[0]._id
                }, JWT_KEY ,
                {
                    expiresIn : "1h"
                }); 
                //console.log(token);
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            res.status(401).json({
                message :'Auth Failed'
            }) 
        })
    })
    .catch(err =>{
        console.log('err');
        req.status(500).json({
            error: err
        })
    });

});

router.get('/verifyUser',verifyAuth,(req, res)=>{
    res.send();
    })


router.get('/logout', (req, res)=>{
    //console.log('Logged out')
    res.status(200).json({
        logout:"logout"
    })
}) 


module.exports = router;