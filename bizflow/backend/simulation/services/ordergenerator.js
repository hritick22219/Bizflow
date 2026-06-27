const Order = require('../../models/order');
const updateInventory =
    require('./inventoryupdater');
const customers = [
    'Rahul Sharma',
    'Priya Singh',
    'Aman Gupta',
    'Sneha Verma',
    'Rohit Kumar'
];

const products = [
    'Milk',
    'Bread',
    'Eggs',
    'Cheese',
    'Butter',
    'Rice',
    'Oil'
];

async function generateOrder() {

    try {
        const customer =customers[Math.floor(Math.random() * customers.length)];

        const product =products[Math.floor(Math.random() * products.length)];

        const quantity = Math.floor(Math.random() * 3) + 1;

        const amount =(Math.floor(Math.random() * 100) + 20) * quantity;

        const order = new Order({
            customer,
            items: [
            {
            productName: product,
            quantity: quantity
            }
            ],

            amount
        });

        
        const savedOrder = await order.save();
        await updateInventory(savedOrder);

        console.log('Order Saved');
        console.log('New Order Added:', order);

    } catch (error) {

        console.log('Error generating order:', error);

    }
}

module.exports = generateOrder;