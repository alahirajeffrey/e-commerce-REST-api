const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAmin} = require("./verifyToken");
const Order = require("../models/Order");

//create order
router.post('/', verifyToken, async (req, res)=>{
    const order = new Order(req.body);

    try{
        const savedOrder = await newCart.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

//update order
router.put('/:id', verifyTokenAndAmin, async (req, res)=>{
    try{
        const updatedOrder = await order.findByIdAndUpdate(req.params.id, {
            $set: req.body},
            {new : true})
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json(err);
    }
})

//delete order
router.delete("/:id", verifyTokenAndAmin, async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get user order
router.get('/findOne/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const orders = await Cart.find({userId : req.params.id})
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all orders
router.get('/' , verifyTokenAndAmin, async (req, res)=>{
    try{
        const orders = await Order.find()
        req.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/hello', (req, res)=>{
    res.send("working")
})

module.exports = router;