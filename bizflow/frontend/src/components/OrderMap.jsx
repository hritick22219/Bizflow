function OrderMap() {

    return (
        <div>

            <h2 style={styles.heading}>
                🗺️ Live Order Map
            </h2>

            <iframe
                title="map"
                width="100%"
                height="400"
                style={styles.map}
                src="https://maps.google.com/maps?q=Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed"
            />

            <div style={styles.stats}>

                <div style={styles.statCard}>
                    <h3>25</h3>
                    <p>Delivered</p>
                </div>

                <div style={styles.statCard}>
                    <h3>18</h3>
                    <p>In Transit</p>
                </div>

                <div style={styles.statCard}>
                    <h3>7</h3>
                    <p>Pending</p>
                </div>

            </div>

        </div>
    );
}

const styles = {

    heading: {
        marginBottom: '20px'
    },

    map: {
        borderRadius: '12px',
        border: 'none'
    },

    stats: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        gap: '10px'
    },

    statCard: {
        flex: 1,
        textAlign: 'center',
        padding: '18px',
        background: '#f8fafc',
        borderRadius: '12px'
    }
};

export default OrderMap;