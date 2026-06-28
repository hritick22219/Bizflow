function OrderMap() {

    return (

        <div className="panel">

            <div className="panelHeader">
                <h2>🗺️ Live Order Map</h2>
                <span>View Full Map</span>
            </div>

            <iframe
                title="Live Map"
                src="https://maps.google.com/maps?q=Delhi&t=&z=11&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="310"
                style={{
                    border: 'none',
                    borderRadius: '18px'
                }}
                loading="lazy"
            />

            <div className="mapStats">

                <div className="mapStatCard">
                    <h2>25</h2>
                    <p>Delivered</p>
                </div>

                <div className="mapStatCard">
                    <h2>18</h2>
                    <p>In Transit</p>
                </div>

                <div className="mapStatCard">
                    <h2>7</h2>
                    <p>Pending</p>
                </div>

            </div>

        </div>
    );
}

export default OrderMap;