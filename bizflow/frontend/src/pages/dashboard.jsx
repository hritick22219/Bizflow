import StatsCards from '../components/StatsCards';
import InventoryPanel from '../components/InventoryPanel';
import InventoryExpiry from '../components/InventoryExpiry';
import OrderMap from '../components/OrderMap';
import DeliveryPanel from '../components/DeliveryPanel';
import OnlineOrdersPanel from '../components/OnlineOrdersPanel';

function Dashboard() {
    return (
        <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <StatsCards />

            <div className="dashboard-grid">
                <div className="col-left" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <InventoryPanel />
                    <InventoryExpiry />
                </div>

                <div className="col-center" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <OrderMap />
                    <DeliveryPanel />
                </div>

                <div className="col-right" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <OnlineOrdersPanel />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;