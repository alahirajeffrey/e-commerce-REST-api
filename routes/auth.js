const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//register user
router.post("/register", async (req, res)=>{
    
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        
        //encrypt password
        password : CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString()
    })

    //save user
    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//login
router.get('/login', async (req, res)=>{
    
    try{
        //check if user exists
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(404).json('user not found');
        }else{
            //decrypt saved password
            const password = CryptoJS.AES.decrypt(user.password, process.env.SEC_PASS).toString(CryptoJS.enc.Utf8);
            
            //compare passwords
            if(password!==req.body.password){
                res.status(401).json("Wrong credentials");
            }else{

                //create json web token
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin : user.isAdmin
                },
                process.env.JWT_SEC_KEY,
                {expiresIn:"1d"});

                res.status(200).json({
                    "username":user.username,
                    "email" : user.email,
                    "isAdmin" : user.isAdmin,
                    "dateCreated" : user.createdAt,
                    "accessToken" : accessToken
                });
            }
        }

    }catch(err){}

})

module.exports = router;