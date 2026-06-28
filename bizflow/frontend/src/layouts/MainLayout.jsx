import InventoryPanel from '../components/InventoryPanel';
import InventoryExpiry from '../components/InventoryExpiry';
import TopSelling from '../components/TopSelling';
import OrderMap from '../components/OrderMap';
import DeliveryPanel from '../components/DeliveryPanel';
import OnlineOrdersPanel from '../components/OnlineOrdersPanel';
import SalesOverview from '../components/SalesOverview';
import StatsCards from '../components/StatsCards';
import './MainLayout.css';
function MainLayout() {
    return (

        <div className="dashboard">

            <div className="header">

                <div>
                    <h1>Dashboard</h1>
                    <p>Real-time overview of inventory, orders and sales</p>
                </div>

                <button className="exportBtn">
                    Export Report
                </button>

            </div>

            <StatsCards />

            <div className="dashboardGrid">

                <div className="leftColumn">

                    <InventoryPanel />

                    <InventoryExpiry />

                    <TopSelling />

                </div>

                <div className="middleColumn">

                    <OrderMap />

                    <DeliveryPanel />

                </div>

                <div className="rightColumn">

                    <OnlineOrdersPanel />

                    <SalesOverview />

                </div>

            </div>

        </div>
    );
}

export default MainLayout;