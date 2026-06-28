import { useEffect, useState } from 'react';
import api from '../services/api';

function OnlineOrdersPanel() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    const fetchOrders = async () => {

        try {

            const response = await api.get('/api/orders');

            setOrders(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const platforms = [
        'Amazon',
        'Flipkart',
        'Website',
        'Meesho'
    ];

    return (

        <div className="panel">

            <div className="panelHeader">
                <h2>🛒 Orders Overview</h2>
            </div>

            <div className="orderSummary">

                <div className="summaryBox">
                    <h3>{orders.length}</h3>
                    <p>Total Orders</p>
                </div>

                <div className="summaryBox">
                    <h3>₹{orders.length * 120}</h3>
                    <p>Revenue</p>
                </div>

            </div>

            <h3 className="historyTitle">
                Recent Orders
            </h3>

            {orders.slice(0, 5).map((order, index) => (

                <div
                    key={order._id}
                    className="orderCard"
                >

                    <div>

                        <strong>
                            {order.customer}
                        </strong>

                        <p>
                            {order.items[0].productName}
                        </p>

                        <small>
                            Platform:
                            {' '}
                            {platforms[index % 4]}
                        </small>

                    </div>

                    <div>

                        <span className="paidStatus">
                            Paid
                        </span>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default OnlineOrdersPanel;