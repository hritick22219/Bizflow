const express = require('express');
const router = express.Router();

const Inventory = require('../models/inventory');


// GET all inventory items

router.get('/', async (req, res) => {

    try {

        const items = await Inventory.find();

        res.json(items);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// POST new inventory item

router.post('/', async (req, res) => {

    try {

        const newItem = new Inventory({

            productName: req.body.productName,
            quantity: req.body.quantity,
            buyingPrice: req.body.buyingPrice,
            sellingPrice: req.body.sellingPrice,
            expiryDate: req.body.expiryDate

        });

        const savedItem = await newItem.save();

        res.status(201).json(savedItem);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;