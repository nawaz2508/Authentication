const express = require('express');

const Product = require('../models/product.model');

const authenticate = require('../midllewares/authenticate');

const router = express.Router();

router.post("", authenticate, async (req, res) => {
    try{
        // console.log("req", req.user);
        req.body.user_id = req.user_id;
        const user_id = req.user._id;
        const product = await Product.create(req.body);

        return res.send(product);
    }
    catch(err) {
        return res.status(500).send({ message: err.message});
    }
}); 


router.get("", async (req, res) => {
    try{
        const products = await Product.find().lean().exec();

        return res.send(products);
    }
    catch(err) {
        return res.status(500).send({ message: err.message});
    }
}); 

module.exports = router;