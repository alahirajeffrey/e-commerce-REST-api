const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAmin} = require("./verifyToken");
const Cart = require("../models/Cart");

//create product
router.post('/', verifyToken, async (req, res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

//update product
router.put('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body},
            {new : true})
        res.status(200).json(updatedCart)
    }catch(err){
        res.status(500).json(err);
    }
})

//delete product
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get user product
router.get('/findOne/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const cart = await Cart.findOne({userId : req.params.id})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all carts
router.get('/' , verifyTokenAndAmin, async (req, res)=>{
    try{
        const carts = await Cart.find()
        req.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/hello', (req, res)=>{
    res.send("working")
})

module.exports = router;