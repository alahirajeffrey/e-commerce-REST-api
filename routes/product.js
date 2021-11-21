const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAmin} = require("./verifyToken");
const Product = require("../models/product");

//create product
router.post('/', verifyTokenAndAmin, async (req, res)=>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(newProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//update product
router.put('/:id', verifyTokenAndAmin, async (req, res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body},
            {new : true})
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json(err);
    }
})

//delete product
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get single product
router.get('/findOne/:id', async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;