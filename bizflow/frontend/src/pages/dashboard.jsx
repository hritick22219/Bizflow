import DeliveryPanel from '../components/DeliveryPanel';
import InventoryPanel from '../components/InventoryPanel';
import OnlineOrdersPanel from '../components/OnlineOrdersPanel';

function Dashboard() {

    return (

        <div>

            <h1>BizFlow Dashboard</h1>

            <div style={styles.grid}>

                <DeliveryPanel />

                <InventoryPanel />

                <OnlineOrdersPanel />

            </div>

        </div>
    );
}

const styles = {

    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px',
        marginTop: '20px'
    }

};

export default Dashboard;