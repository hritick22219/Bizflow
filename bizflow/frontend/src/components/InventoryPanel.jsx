function InventoryPanel() {

    return (

        <div style={styles.card}>

            <h2>📦 Inventory</h2>

            <p>Total Products : 150</p>
            <p>Low Stock : 12</p>
            <p>Out of Stock : 8</p>

            <hr />

            <h3>⚠ Expiry Alerts</h3>

            <p>Milk - 2 days left</p>
            <p>Bread - 1 day left</p>
            <p>Cheese - 5 days left</p>

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

export default InventoryPanel;