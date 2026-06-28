function DeliveryPanel() {

    return (

        <div style={styles.card}>

            <h2>🚚 Delivery Apps</h2>

            <p>Porter : 5 Deliveries</p>
            <p>Delhivery : 8 Deliveries</p>
            <p>BlueDart : 2 Deliveries</p>
            <p>Shadowfax : 4 Deliveries</p>

        </div>

    );
}

const styles = {
    card: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    }
};

export default DeliveryPanel;