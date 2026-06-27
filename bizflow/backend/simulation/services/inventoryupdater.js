const Inventory = require('../../models/inventory');

async function updateInventory(order) {

    try {

        for (const item of order.items) {

            const product = await Inventory.findOne({
                productName: item.productName
            });

            if (!product) {

                console.log(
                    `${item.productName} not found in inventory`
                );

                continue;
            }

            product.quantity -= item.quantity;

            if (product.quantity < 0) {
                product.quantity = 0;
            }

            await product.save();

            console.log(
                `${product.productName} updated. Remaining stock: ${product.quantity}`
            );

        }

    } catch (error) {

        console.log(error);

    }

}

module.exports = updateInventory;