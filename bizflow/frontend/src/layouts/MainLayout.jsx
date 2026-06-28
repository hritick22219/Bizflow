import './MainLayout.css';

import StatsCards from '../components/StatsCards';
import InventoryPanel from '../components/InventoryPanel';
import InventoryExpiry from '../components/InventoryExpiry';
import OrderMap from '../components/OrderMap';
import DeliveryPanel from '../components/DeliveryPanel';
import OnlineOrdersPanel from '../components/OnlineOrdersPanel';
import SalesOverview from '../components/SalesOverview';

function MainLayout() {
    return (
        <div className="dashboard">

            {/* Header */}

            <div className="header">

                <div>
                    <h1>BizFlow Dashboard</h1>

                    <p>
                        Real-time overview of inventory,
                        orders, deliveries & sales
                    </p>
                </div>

                <button className="exportBtn">
                    Export Report
                </button>

            </div>

            {/* KPI Cards */}

            <StatsCards />

            {/* Main Grid */}

            <div className="dashboardGrid">

                {/* LEFT COLUMN */}

                <div className="leftColumn">

                    <InventoryPanel />

                    <InventoryExpiry />

                </div>


                {/* MIDDLE COLUMN */}

                <div className="middleColumn">

                    <OrderMap />

                    <DeliveryPanel />

                </div>


                {/* RIGHT COLUMN */}

                <div className="rightColumn">

                    <OnlineOrdersPanel />

                    <SalesOverview />

                </div>

            </div>

        </div>
    );
}

export default MainLayout;