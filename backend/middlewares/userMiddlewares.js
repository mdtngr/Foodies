function isUserAuthor(req,res,next)
{
   const user = req.user  
    flag= true

    if(flag){
        return res.status(400).send('Access Denied');
    }
    try{
        console.log("User is author")
        next();
        
    }catch(err){
        res.status(400).send(err);
    }
}; 



const jwt = require('jsonwebtoken')
function isUserLoggedIn(req,res,next)
{
   const token = req.header('token');
   console.log(token);

    if(!token){
        console.log("NOT LOGGED IN");
        return res.status(401).send('Access Denied - Log In to Continue');
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
        
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}; 

module.exports.isUserLoggedIn = isUserLoggedIn
module.exports.isUserAuthor = isUserAuthor