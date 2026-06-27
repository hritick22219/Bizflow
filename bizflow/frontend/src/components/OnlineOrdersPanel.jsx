import { useEffect, useState } from 'react';
import axios from 'axios';

function OnlineOrdersPanel() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
    try {
        const response = await axios.get(
            'https://bizflow-production-4740.up.railway.app/api/orders'
        );

        console.log("Orders from backend:", response.data);

        setOrders(response.data);

    } catch (error) {
        console.log("Error fetching orders:", error);
    }
};

    useEffect(() => {

        fetchOrders();

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div style={styles.card}>

            <h2>🛒 Online Orders</h2>

            <p>Total Orders: {orders.length}</p>

            {orders.slice(-5).map((order) => (

                <div key={order._id}>

                    <p>
                        {order.customer} ordered {' '}
                        {order.items[0].productName} {' '}
                        (Qty: {order.items[0].quantity})
                    </p>

                </div>

            ))}

        </div>

    );
}

const styles = {
    card: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        minHeight: '400px'
    }
};

export default OnlineOrdersPanel;