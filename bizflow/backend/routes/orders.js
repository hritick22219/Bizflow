const express = require('express');
const router = express.Router();

const Order = require('../models/order');


// GET all orders
router.get('/', async (req, res) => {

    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// POST new order
router.post('/', async (req, res) => {

    try {

        const newOrder = new Order({

            customer: req.body.customer,

            items: req.body.items,

            amount: req.body.amount

        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;