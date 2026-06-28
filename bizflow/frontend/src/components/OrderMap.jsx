function OrderMap() {

    return (
        <div>

            <h2 style={styles.heading}>
                🗺️ Live Order Map
            </h2>

            <iframe
                title="map"
                width="100%"
                height="100"
                style={styles.map}
                src="https://maps.google.com/maps?q=Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed"
            />

            <div className="mapStats">

                <div className="mapStatCard">
                    <h3>25</h3>
                    <p>Delivered</p>
                </div>

                <div className="mapStatCard">
                    <h3>18</h3>
                    <p>In Transit</p>
                </div>

                <div className="mapStatCard">
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
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: '10px',
        marginTop: '12px'
    },

    statCard: {
        textAlign: 'center',
        padding: '10px',
        background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
        color: '#fff',
        borderRadius: '12px'
        }
};

export default OrderMap;