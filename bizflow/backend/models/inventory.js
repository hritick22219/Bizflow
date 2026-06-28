const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        unique: true
    },

    quantity: {
        type: Number,
        required: true
    },

    expiryDate: {
        type: Date
    },

    buyingPrice: {
        type: Number
    },

    sellingPrice: {
        type: Number
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);