import { useEffect, useState } from 'react';
import api from '../services/api';

function InventoryPanel() {

    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {

        try {

            const response = await api.get('/api/inventory');

            setInventory(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchInventory();

        // Refresh every 5 seconds
        const interval = setInterval(() => {
            fetchInventory();
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div style={styles.card}>

            <h2>📦 Inventory</h2>

            {inventory.map((item) => (

                <div key={item._id} style={styles.item}>

                    <h4>{item.productName}</h4>

                    <p>Quantity: {item.quantity}</p>

                    <p>Buying Price: ₹{item.buyingPrice}</p>

                    <p>Selling Price: ₹{item.sellingPrice}</p>

                </div>

            ))}

        </div>
    );
}

const styles = {
    card: {
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },

    item: {
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
        paddingBottom: '10px'
    }
};

export default InventoryPanel;