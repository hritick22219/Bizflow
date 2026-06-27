function OnlineOrdersPanel() {

    return (

        <div style={styles.card}>

            <h2>🛒 Online Orders</h2>

            <p>Amazon : 15 Orders</p>
            <p>Flipkart : 9 Orders</p>
            <p>Shopify : 20 Orders</p>
            <p>Website : 7 Orders</p>
            <p>Meesho : 4 Orders</p>

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