import './MainLayout.css';

import StatsCards from '../components/StatsCards';
import InventoryPanel from '../components/InventoryPanel';
import InventoryExpiry from '../components/InventoryExpiry';
import OrderMap from '../components/OrderMap';
import DeliveryPanel from '../components/DeliveryPanel';
import OnlineOrdersPanel from '../components/OnlineOrdersPanel';

function MainLayout() {
    return (
        <div className="dashboard">

            {/* Header */}

            <div className="header">

                <div className="headerLeft">
                    <h1>Dashboard</h1>

                    <p>
                        Real-time overview of your inventory,
                        orders, deliveries & sales
                    </p>
                </div>

                <div className="headerRight">

                    <button className="dateBtn">
                        28 May 2025
                    </button>

                    <button className="notificationBtn">
                        🔔
                    </button>

                    <button className="exportBtn">
                        Export Report
                    </button>

                </div>

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

                </div>

            </div>

        </div>
    );
}

export default MainLayout;