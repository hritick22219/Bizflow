import InventoryPanel from '../components/InventoryPanel';
import DeliveryPanel from '../components/DeliveryPanel';
import OnlineOrdersPanel from '../components/OnlineOrdersPanel';
import SalesOverview from '../components/SalesOverview';
import InventoryExpiry from '../components/InventoryExpiry';
import OrderMap from '../components/OrderMap';

function MainLayout() {
    return (
        <div style={styles.container}>

            <h1 style={styles.title}>BizFlow Dashboard</h1>

            <div style={styles.grid}>

                {/* LEFT SECTION */}
                <div style={styles.column}>

                    <div style={styles.card}>
                        <InventoryPanel />
                    </div>

                    <div style={styles.card}>
                        <InventoryExpiry />
                    </div>

                </div>

                {/* MIDDLE SECTION */}
                <div style={styles.column}>

                    <div style={styles.mapCard}>
                        <OrderMap />
                    </div>

                    <div style={styles.card}>
                        <DeliveryPanel />
                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div style={styles.column}>

                    <div style={styles.card}>
                        <OnlineOrdersPanel />
                    </div>

                    <div style={styles.card}>
                        <SalesOverview />
                    </div>

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {
        backgroundColor: '#f5f7fb',
        minHeight: '100vh',
        padding: '30px'
    },

    title: {
        fontSize: '34px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '30px'
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr 1fr',
        gap: '24px'
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },

    card: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
    },

    mapCard: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        minHeight: '500px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
    }
};

export default MainLayout;