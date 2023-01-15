const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAmin,
} = require("../utils/verifyToken");
const Product = require("../models/product");

//create product
router.post("/", verifyTokenAndAmin, async (req, res) => {
  //validate request
  if (!req.body.title)
    return res
      .status(400)
      .send({ message: "Ooops. Product title is required.." });
  if (!req.body.description)
    return res
      .status(400)
      .send({ message: "Ooops. Product description is required.." });
  if (!req.body.img)
    return res
      .status(400)
      .send({ message: "Ooops. Product image link is required.." });
  if (!req.body.price)
    return res
      .status(400)
      .send({ message: "Ooops. Product price is required.." });

  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product
router.put("/:id", verifyTokenAndAmin, async (req, res) => {
  //validate request
  if (!req.params.id)
    return res.status(400).send({ message: "Ooops. Product id is required.." });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete product
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //validate request
  if (!req.params.id)
    return res.status(400).send({ message: "Ooops. Product id is required.." });

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single product
router.get("/findOne/:id", async (req, res) => {
  //validate request
  if (!req.params.id)
    return res.status(400).send({ message: "Ooops. Product id is required.." });

  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
