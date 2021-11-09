const jwt = require('jsonwebtoken')

//function to verify jwt token
const verifyToken = (req, res, next) =>{
    const authHeader = request.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC_KEY, (err, user)=>{
            if(err) return res.status(403).json("Invalid token");
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("Not authenticated");
    }
}

//function to verify authorization of users
const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

//function to verify admin
const verifyTokenAndAmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAmin}