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
        background: '#eef2f7',
        minHeight: '100vh',
        padding: '12px 20px',
        fontFamily: 'Inter, sans-serif'
    },

    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '12px'
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr 1fr',
        gap: '15px',
        height: 'calc(100vh - 90px)'
    },

    column: {
        display: 'grid',
        gridTemplateRows: '48% 48%',
        gap: '15px',
        minHeight: 0
    },

    card: {
        background: '#fff',
        borderRadius: '18px',
        padding: '18px',
        boxShadow: '0 8px 25px rgba(15,23,42,0.08)',
        border: '1px solid #e2e8f0',
        overflowY: 'auto'
    },

    mapCard: {
        background: '#fff',
        borderRadius: '18px',
        padding: '18px',
        boxShadow: '0 8px 25px rgba(15,23,42,0.08)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
    }
};

export default MainLayout;