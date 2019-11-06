const jwt = require('jsonwebtoken');
var JWT_KEY = 'jwtsecrete';
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader )
    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        const decoded = jwt.verify(req.token , JWT_KEY ,(err,authData)=>{
                if(err){
                    res.send("err")
                }else{
                    res.status(200).json({"token":req.token ,"authData": authData });
                    next();

                }
            })
            }else{
            res.send('Auth-Check error');
        }
    
}

module.exports = verifyToken;