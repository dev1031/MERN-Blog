const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const session = require('express-session');
var JWT_KEY = 'jwtsecrete';
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/jwt_user" ,{ useNewUrlParser: true,useUnifiedTopology: true },(err,db)=>{
    if (err)throw err;
    console.log('Database Connect')
})
mongoose.Promise = global.Promise;

app.use(cors());
app.use(session({
    secret: JWT_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: { 
        maxAge: 1000*60*60*24 }
}));

app.use('/' , userRoutes);
app.use('/posts', postRoutes);

app.listen(port,(req, res)=>{
    console.log(`The port is running at the port:${port}`)})

    