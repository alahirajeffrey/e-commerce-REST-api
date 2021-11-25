const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAmin} = require("./verifyToken");
const Order = require("../models/Order");

//create order
router.post('/', verifyToken, async (req, res)=>{

    //validate request
    if(!req.body.userId) return res.status(400).send({message : "Ooops. UserId is required.."})
    if(!req.body.address) return res.status(400).send({message : "Ooops. User address is required.."})

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

    //validate request
    if(!req.params.id) return res.status(400).send({message : "Ooops. Id is required.."})

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

    //validate request
    if(!req.params.id) return res.status(400).send({message : "Ooops. Id is required.."})

    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get user order
router.get('/findOne/:id', verifyTokenAndAuthorization, async (req, res)=>{
    
    //validate request
    if(!req.params.id) return res.status(400).send({message : "Ooops. UserId is required.."})

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

module.exports = router;