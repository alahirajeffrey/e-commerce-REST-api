const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const CryptoJS = require('crypto-js');
const User = require("../models/User");

//update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
     //check password
     if(req.body.password){
        //encrypt password
        hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body}, 
            {new: true});
            
        res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500).json(err);
    }
})

//delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get single user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)

        const {password, ...others} = user._doc
        res.status(200).json(...others)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;