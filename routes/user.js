const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAmin} = require("./verifyToken");
const CryptoJS = require('crypto-js');
const User = require("../models/User");

//update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    //validate request
    if(!req.body.username) return res.status(400).send({message : "Ooops. Username missing.."})
    if(!req.body.email) return res.status(400).send({message : "Ooops. Email missing.."})
    if(!req.body.password) return res.status(400).send({message : "Ooops. Password missing.."})

     //check password
     if(req.body.password){
        //encrypt password
        hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body}, 
            {new: true});
            
        res.status(200).json({
            "userId" : updatedUser.id,
            "username":updatedUser.username,
            "email" : updatedUser.email,
            "isAdmin" : updatedUser.isAdmin,
            "dateCreated" : updatedUser.createdAt,
            "accessToken" : updatedUser.accessToken
        });
    }catch(err){
        return res.status(500).json(err);
    }
})

//delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    
    //validate request
    if(!req.params.id) return res.status(400).send({message : "Ooops. User id required.."})
    
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get single user
// router.get("/:id", verifyTokenAndAmin, async (req, res)=>{
//     try{
//         const user = await User.findById(req.params.id)
//         res.send(200).json({
//             "userId" : user.id,
//             "username":user.username,
//             "email" : user.email,
//             "isAdmin" : user.isAdmin,
//             "dateCreated" : user.createdAt,
//             "accessToken" : accessToken
//         })
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

//get all users
// router.get("/:id", verifyTokenAndAmin, async (req, res)=>{
//     try{
//         const users = await User.find()
//         res.status(200).json(users)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

module.exports = router;