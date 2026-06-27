# BizFlow — Business Automation Dashboard
### Complete Project Documentation & Step-by-Step Guide

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [What We're Building](#2-what-were-building)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Marketplace API Access](#5-marketplace-api-access)
6. [Delivery API — Porter](#6-delivery-api--porter)
7. [Project Structure](#7-project-structure)
8. [Backend — Step by Step](#8-backend--step-by-step)
9. [Frontend — Step by Step](#9-frontend--step-by-step)
10. [Database Models](#10-database-models)
11. [API Endpoints Reference](#11-api-endpoints-reference)
12. [Real-Time Features (Socket.io)](#12-real-time-features-socketio)
13. [How to Run the Project](#13-how-to-run-the-project)
14. [Environment Variables](#14-environment-variables)
15. [Seeding the Database](#15-seeding-the-database)
16. [Marketplace Integration Roadmap](#16-marketplace-integration-roadmap)
17. [Future Enhancements](#17-future-enhancements)

---

## 1. Project Overview

**BizFlow** is a unified business automation dashboard designed for Indian e-commerce sellers and small businesses. Instead of juggling multiple tabs across different platforms, BizFlow consolidates everything into a single command center.

### The Problem It Solves

Indian sellers typically manage:
- Porter / delivery partner app (for tracking shipments)
- Amazon Seller Central (for marketplace orders)
- Flipkart Seller Dashboard (for marketplace orders)
- Meesho Supplier Panel (for social commerce orders)
- A separate inventory spreadsheet
- WhatsApp for customer queries

**BizFlow brings all of this into one screen.**

---

## 2. What We're Building

The dashboard has **5 core panels**:

| Panel | What It Does |
|---|---|
| **Porter Order Tracking** | Live tracking of all deliveries — driver info, location, ETA, status timeline |
| **Online Store Orders** | Unified order panel showing orders from all channels (Amazon, Flipkart, Meesho, own store) |
| **Inventory Management** | Stock levels, low stock alerts, product CRUD, stock adjustment history |
| **Analytics & Revenue** | Revenue charts, KPI cards, top products, orders by source/status |
| **Notifications & Alerts** | Real-time alerts for new orders, low stock, delivery updates, payment confirmations |

---

## 3. Tech Stack

### Backend
| Tool | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MongoDB** | Primary database (document store) |
| **Mongoose** | MongoDB ODM (schema + queries) |
| **Socket.io** | Real-time bidirectional communication |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |

### Frontend
| Tool | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router v6** | Client-side routing |
| **TanStack Query v5** | Server state management & caching |
| **Recharts** | Charts and data visualizations |
| **Axios** | HTTP client |
| **Socket.io Client** | Real-time updates |
| **React Hot Toast** | Toast notifications |
| **Lucide React** | Icon library |

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│                                                             │
│   ┌──────────────┐  ┌────────────┐  ┌──────────────────┐   │
│   │  React App   │  │ Socket.io  │  │  TanStack Query  │   │
│   │  (Vite)      │  │  Client    │  │  (data caching)  │   │
│   └──────┬───────┘  └─────┬──────┘  └────────┬─────────┘   │
│          │                │                   │             │
└──────────┼────────────────┼───────────────────┼─────────────┘
           │ HTTP REST      │ WebSocket         │ HTTP REST
           ▼                ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER (Node.js)                   │
│                                                             │
│   /api/auth         /api/porter        /api/orders          │
│   /api/inventory    /api/analytics     /api/notifications   │
│                                                             │
│   ┌─────────────────────────────────────┐                   │
│   │           Socket.io Server          │                   │
│   │  Rooms: dashboard                   │                   │
│   │  Events: order:new, porter:update,  │                   │
│   │          inventory:low-stock, etc.  │                   │
│   └─────────────────────────────────────┘                   │
└──────────────────────────┬──────────────────────────────────┘
                           │ Mongoose ODM
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        MONGODB                               │
│                                                             │
│   users  │  orders  │  porter_orders  │  inventories        │
│   notifications                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                    External APIs
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    Porter API      Amazon SP-API    Flipkart API
   (delivery)       (marketplace)   (marketplace)
```

---

## 5. Marketplace API Access

This section explains which platforms provide API access and how to get it.

### 🛒 Amazon — Full API (SP-API)

**Status: ✅ Available — Self-serve**

Amazon provides the most mature developer API in India called the **Selling Partner API (SP-API)**.

**What you can access:**
- Orders (fetch, update status, cancel)
- Inventory (FBA + FBM stock levels)
- Listings (create, update, delete products)
- Shipments (create shipment plans, tracking)
- Reports (sales reports, inventory reports)
- Payments and settlements
- Returns and refunds

**How to get access:**
1. You need a **Professional Selling Account** on Amazon.in
2. Go to **Seller Central → Apps and Services → Develop Apps**
3. Complete the **Developer Profile** form (describe your use case, data handling)
4. Amazon reviews and approves (usually 1–3 business days)
5. Create a **Private Application** (for your own store — self-authorized, no approval needed)
6. You get `Client ID`, `Client Secret`, and `Refresh Token`

**API Base URL:** `https://sellingpartnerapi-in.amazon.com`

**Key endpoints for dashboard:**
```
GET  /orders/v0/orders                  → List orders
GET  /orders/v0/orders/{orderId}        → Order details
GET  /fba/inventory/v1/summaries        → Inventory levels
POST /feeds/2021-06-30/feeds            → Bulk updates
GET  /reports/2021-06-30/reports        → Sales reports
```

**Cost:** Free for private/self-use apps. Metered billing only applies to high-volume public apps.

---

### 🛍️ Flipkart — Full API (v3.0)

**Status: ✅ Available — Self-serve via Seller Dashboard**

Flipkart provides a REST API v3.0 for all registered sellers.

**What you can access:**
- Orders (list, search, update lifecycle)
- Listings (products, pricing, categories)
- Inventory (stock count per SKU)
- Shipping labels and invoices
- Returns management
- Seller performance metrics

**How to get access:**
1. Register as a seller at **seller.flipkart.com**
2. Go to **Seller Dashboard → Manage Profile → Developer Access**
3. Create a **Self-Access Application** (for your own store)
4. You get `App ID` and `App Secret`
5. Email `sellerapi-dev-support@flipkart.com` with your Seller ID to request sandbox access

**Authentication:** OAuth 2.0 (client credentials flow for self-access)

**Token endpoint:**
```
GET https://api.flipkart.net/oauth-service/oauth/token
    ?grant_type=client_credentials
    &scope=Seller_Api,Default
```

**Key endpoints:**
```
GET  /sellers/v2/orders              → List orders
GET  /sellers/skus/{sku}/listings    → Get inventory
PUT  /sellers/skus/listings/{id}     → Update stock
POST /sellers/v2/shipments           → Create shipment
GET  /sellers/v2/returns             → Returns list
```

**API base URL:** `https://api.flipkart.net`

---

### 🧡 Meesho — Limited/Indirect API

**Status: ⚠️ Available but NOT self-serve — request-based**

Meesho has an internal API used by integration partners, but direct developer access requires a manual request.

**What you can access:**
- Orders (push-based — Meesho sends orders to you via webhooks)
- Inventory sync (push stock levels to Meesho)
- Catalog / SKU mapping
- Shipping labels
- Order status updates (limited — seller cannot cancel after acceptance)
- Return and cancellation webhooks

**Important limitations:**
- Seller-initiated cancellations are **not supported** via API
- The entire order journey is **controlled by Meesho** (you cannot modify it)
- No self-serve API key generation — credentials are issued manually

**How to get access:**
1. Register as a seller at **supplier.meesho.com**
2. Complete GSTIN verification and pickup address
3. Email **meesholink-integration@meesho.com**
   - Subject: `Request for API Credentials`
   - Body: Include your Supplier ID and use case
4. Meesho generates and sends a **Refresh Token** for your account
5. Use this token to authenticate API calls

**Recommended workaround:** Use a multichannel middleware like **Unicommerce** or **EasyEcom** which already has Meesho integrated and exposes a unified API to your dashboard.

---

### 🚚 Porter — Delivery/Logistics API

**Status: ✅ Available — Enterprise account required**

Porter provides a logistics API for businesses to book deliveries, track shipments, and receive webhook updates.

**What you can access:**
- Rate fetch (get delivery cost before booking)
- Order creation (book a pickup + delivery)
- Live tracking (driver location, ETA, status)
- Order cancellation
- Delivery authentication (OTP-based)
- Webhook updates (real-time status changes)

**Available vehicle types via API:** Two-wheelers (bikes) currently; mini trucks require Enterprise dashboard

**How to get access:**
1. Contact Porter at **help@porter.in** or visit **porter.in/enterprise**
2. Sign up for **Porter Enterprise**
3. Account activation takes ~1 business day
4. You receive API credentials and webhook endpoint configuration

**Key API operations:**
```
POST /v1/orders                      → Create delivery order
GET  /v1/orders/{order_id}           → Track order
GET  /v1/orders/{order_id}/track     → Live tracking URL
POST /v1/orders/{order_id}/cancel    → Cancel order
GET  /v1/fare-estimate               → Get fare before booking
```

---

## 6. Delivery API — Porter

### Porter Order Lifecycle

```
PENDING → ASSIGNED → PICKUP → IN_TRANSIT → DELIVERED
                                     ↓
                                 CANCELLED / FAILED
```

| Status | Meaning |
|---|---|
| `pending` | Order placed, looking for driver |
| `assigned` | Driver allocated |
| `pickup` | Driver arrived at pickup point |
| `in_transit` | Package picked up, heading to customer |
| `delivered` | Delivery completed |
| `cancelled` | Order cancelled |
| `failed` | Delivery failed (customer not available, etc.) |

### Porter Webhook Events

Porter sends real-time POST requests to your configured webhook URL:

```json
{
  "order_id": "PTR-001001",
  "status": "in_transit",
  "driver": {
    "name": "Ramesh Kumar",
    "phone": "9876543210",
    "vehicle": "bike",
    "registration": "KA05AB1234"
  },
  "location": {
    "lat": 28.5706,
    "lng": 77.3219
  },
  "estimated_delivery": "2025-01-15T14:30:00Z"
}
```

---

## 7. Project Structure

```
bizflow/
├── backend/
│   ├── server.js              ← Express + Socket.io server entry point
│   ├── seed.js                ← Database seeder with sample Indian data
│   ├── .env.example           ← Environment variable template
│   ├── package.json
│   ├── middleware/
│   │   └── auth.js            ← JWT authentication middleware
│   ├── models/
│   │   ├── User.js            ← User schema (admin/manager/staff roles)
│   │   ├── Order.js           ← Store order schema (multi-channel)
│   │   ├── PorterOrder.js     ← Porter delivery schema with tracking events
│   │   ├── Inventory.js       ← Product/inventory schema with stock history
│   │   └── Notification.js    ← Notification schema
│   └── routes/
│       ├── auth.js            ← Register, login, profile
│       ├── porter.js          ← Porter CRUD + status updates
│       ├── orders.js          ← Order CRUD + lifecycle management
│       ├── inventory.js       ← Inventory CRUD + stock adjustments
│       ├── analytics.js       ← KPIs, revenue charts, top products
│       └── notifications.js   ← Notifications CRUD + mark read
│
└── frontend/
    ├── index.html
    ├── vite.config.js         ← Vite config with proxy to backend
    ├── package.json
    └── src/
        ├── main.jsx           ← React entry point
        ├── App.jsx            ← Router + layout
        ├── context/
        │   └── AuthContext.jsx   ← Auth state (login/logout)
        ├── hooks/
        │   ├── useSocket.js      ← Socket.io connection hook
        │   └── useApi.js         ← Axios instance with auth headers
        ├── utils/
        │   └── formatters.js     ← Currency, date, status formatters
        └── components/
            ├── dashboard/
            │   ├── Sidebar.jsx       ← Navigation sidebar
            │   ├── TopBar.jsx        ← Header with notifications bell
            │   └── KPICards.jsx      ← Revenue, orders, deliveries cards
            ├── porter/
            │   ├── PorterPanel.jsx   ← Porter order list
            │   └── TrackingTimeline.jsx  ← Delivery event timeline
            ├── orders/
            │   ├── OrdersPanel.jsx   ← Order list with filters
            │   ├── OrderCard.jsx     ← Single order card
            │   └── OrderDetail.jsx   ← Full order detail modal
            ├── inventory/
            │   ├── InventoryPanel.jsx   ← Product grid/table
            │   ├── ProductForm.jsx      ← Add/edit product
            │   └── StockBadge.jsx       ← Low stock indicator
            ├── analytics/
            │   ├── AnalyticsPanel.jsx   ← Charts + KPIs
            │   ├── RevenueChart.jsx     ← Line/bar chart
            │   └── SourcePieChart.jsx   ← Orders by channel
            └── notifications/
                ├── NotificationsPanel.jsx  ← Notification feed
                └── NotificationItem.jsx    ← Single notification
```

---

## 8. Backend — Step by Step

### Step 1: Server Setup (`server.js`)

The main server does four things:
1. Creates an Express app
2. Wraps it in an `http.Server` for Socket.io
3. Connects to MongoDB
4. Mounts all route handlers under `/api/`

```javascript
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: CLIENT_URL } });

// All routes
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/porter',        require('./routes/porter'));
app.use('/api/orders',        require('./routes/orders'));
app.use('/api/inventory',     require('./routes/inventory'));
app.use('/api/analytics',     require('./routes/analytics'));
app.use('/api/notifications', require('./routes/notifications'));
```

### Step 2: Authentication (`routes/auth.js`)

JWT-based authentication with three endpoints:
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Get JWT token
- `GET /api/auth/me` — Get current user (protected)

The JWT middleware (`middleware/auth.js`) extracts the token from the `Authorization: Bearer <token>` header and attaches the user to `req.user`.

### Step 3: Orders (`routes/orders.js`)

The orders route handles the full order lifecycle with these smart automations:

- **On order create:** Reserves inventory (`stock.reserved += qty`)
- **On dispatch:** Deducts actual stock (`stock.current -= qty`) and triggers low stock check
- **On cancel/return:** Releases reserved stock back
- **Every mutation:** Emits `order:new` or `order:update` via Socket.io to all dashboard viewers

### Step 4: Porter Orders (`routes/porter.js`)

Each Porter order stores a `trackingEvents[]` array — a log of every status change with timestamp and location. When a new status update arrives (via webhook from Porter or manual update), a new event is pushed to this array.

```javascript
order.trackingEvents.push({
  status: 'in_transit',
  message: 'Package picked up, heading to destination',
  location: 'HSR Layout, Bengaluru',
  timestamp: new Date()
});
```

### Step 5: Inventory (`routes/inventory.js`)

Inventory uses virtual fields for computed properties:

```javascript
// Computed on-the-fly, not stored in DB
inventorySchema.virtual('availableStock')  → current - reserved
inventorySchema.virtual('isLowStock')      → current <= minimum
inventorySchema.virtual('profit')          → price - costPrice
```

Stock adjustments are logged to `stockHistory[]` for audit trails.

### Step 6: Analytics (`routes/analytics.js`)

Analytics uses MongoDB aggregation pipelines to compute metrics efficiently:

```javascript
// Revenue grouped by day
Order.aggregate([
  { $match: { createdAt: { $gte: since } } },
  { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              revenue: { $sum: "$total" } } }
])

// Top products by quantity sold
Order.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.name", totalQty: { $sum: "$items.quantity" } } },
  { $sort: { totalQty: -1 } },
  { $limit: 10 }
])
```

---

## 9. Frontend — Step by Step

### Step 1: Vite Proxy Setup

The Vite dev server proxies API calls and WebSocket connections to the backend, so no CORS issues during development:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': { target: 'http://localhost:5000' },
    '/socket.io': { target: 'http://localhost:5000', ws: true }
  }
}
```

### Step 2: Socket.io Integration

A custom hook `useSocket.js` manages the Socket.io connection:

```javascript
const socket = io({ path: '/socket.io' });
socket.emit('join-dashboard');  // Join the dashboard room

// Listen for real-time events
socket.on('order:new', (order) => { /* update UI */ });
socket.on('porter:update', (porterOrder) => { /* update tracking */ });
socket.on('inventory:low-stock', (item) => { /* show alert */ });
```

### Step 3: TanStack Query for Data Fetching

All API calls are managed by TanStack Query, which handles caching, background refetching, and loading states:

```javascript
const { data: orders, isLoading } = useQuery({
  queryKey: ['orders', { status, page }],
  queryFn: () => api.get('/orders', { params: { status, page } })
});
```

When a Socket.io event arrives, we invalidate the relevant query to trigger a refetch:

```javascript
socket.on('order:new', () => {
  queryClient.invalidateQueries({ queryKey: ['orders'] });
  queryClient.invalidateQueries({ queryKey: ['analytics'] });
});
```

---

## 10. Database Models

### User
```
name, email, password (hashed), role (admin/manager/staff),
isActive, avatar, timestamps
```

### Order
```
orderNumber (ORD-000001), source (amazon/flipkart/meesho/website/whatsapp),
status (pending→confirmed→processing→packed→dispatched→delivered),
paymentStatus, paymentMethod, customer{}, items[], 
subtotal, discount, shipping, tax, total,
porterOrder (ref), priority (normal/high/urgent), tags[], notes
```

### PorterOrder
```
porterOrderId, storeOrderId (ref), status, vehicleType,
driver{name, phone, rating}, pickup{address,lat,lng,contact},
delivery{address,lat,lng,contact}, estimatedDistance, estimatedTime,
fare, trackingEvents[{status,message,timestamp,location}],
estimatedArrival, deliveredAt, notes
```

### Inventory
```
name, sku, category, description, image, price, costPrice, mrp,
stock{current, reserved, minimum, maximum}, unit, barcode,
supplier, supplierCode, location (shelf/bin), isActive, tags[],
stockHistory[{type,quantity,reason,reference,date}]

Virtuals: availableStock, isLowStock, profit
```

### Notification
```
title, message, type (order_new/order_update/delivery_update/
low_stock/payment/system/alert), priority (low/medium/high/critical),
isRead, readAt, link (deep link to panel), metadata{}, user (ref)
```

---

## 11. API Endpoints Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Current user (protected) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | List orders (filter by status, source, search) |
| GET | `/api/orders/:id` | Single order details |
| POST | `/api/orders` | Create new order |
| PATCH | `/api/orders/:id/status` | Update order status |
| PATCH | `/api/orders/:id` | Update any order field |
| DELETE | `/api/orders/:id` | Delete order |

### Porter
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/porter` | List porter orders |
| GET | `/api/porter/:id` | Single porter order + tracking |
| POST | `/api/porter` | Create porter order |
| PATCH | `/api/porter/:id/status` | Add tracking event + update status |
| DELETE | `/api/porter/:id` | Delete porter order |

### Inventory
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/inventory` | List products (filter by category, lowStock) |
| GET | `/api/inventory/:id` | Single product with history |
| POST | `/api/inventory` | Add new product |
| PATCH | `/api/inventory/:id` | Update product |
| POST | `/api/inventory/:id/stock-adjustment` | Add/remove stock with reason |
| DELETE | `/api/inventory/:id` | Soft-delete product |

### Analytics
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analytics/overview` | KPI cards (revenue, orders, active deliveries) |
| GET | `/api/analytics/revenue-chart` | Daily revenue for last N days |
| GET | `/api/analytics/orders-by-status` | Order count per status |
| GET | `/api/analytics/orders-by-source` | Orders by channel (Amazon, Flipkart, etc.) |
| GET | `/api/analytics/top-products` | Top 10 products by quantity sold |

### Notifications
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notifications` | List notifications (filter by isRead, type) |
| PATCH | `/api/notifications/:id/read` | Mark single notification as read |
| PATCH | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

---

## 12. Real-Time Features (Socket.io)

All dashboard users join the `dashboard` room when they open the app. The server emits events to this room whenever something changes.

### Events Emitted by Server

| Event | Triggered When | Payload |
|---|---|---|
| `order:new` | New order created | Full order object |
| `order:update` | Order status changed | Updated order object |
| `porter:new` | Porter delivery created | Full porter order |
| `porter:update` | Delivery status changed | Updated porter order |
| `inventory:new` | Product added | Full inventory item |
| `inventory:update` | Product updated | Updated inventory item |
| `inventory:stock-update` | Stock adjusted | Updated inventory item |
| `inventory:low-stock` | Stock falls below minimum | Inventory item with current stock |

### Example Server Emission

```javascript
// In orders route, after creating an order:
req.app.get('io').to('dashboard').emit('order:new', order);

// Simultaneously, create a notification in DB:
await Notification.create({
  title: 'New Order Received',
  message: `Order ${order.orderNumber} from ${order.customer.name}`,
  type: 'order_new',
  priority: 'medium'
});
```

---

## 13. How to Run the Project

### Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd bizflow
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your values (MongoDB URI, JWT secret)
nano .env

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

Backend runs at: `http://localhost:5000`

### Step 3: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Step 4: Login

After running the seed script, you can login with:

| Role | Email | Password |
|---|---|---|
| Admin | admin@bizflow.in | admin123 |
| Manager | manager@bizflow.in | manager123 |

---

## 14. Environment Variables

Create a `.env` file in the `/backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bizflow
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/bizflow

# Auth
JWT_SECRET=change_this_to_a_long_random_string_in_production
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173

# Porter API (get from Porter Enterprise account)
PORTER_API_KEY=your_porter_api_key_here
PORTER_BASE_URL=https://api.porter.in/v1

# Amazon SP-API (get from Seller Central → Develop Apps)
AMAZON_CLIENT_ID=amzn1.application-oa2-client.xxx
AMAZON_CLIENT_SECRET=your_amazon_client_secret
AMAZON_REFRESH_TOKEN=Atzr|your_refresh_token
AMAZON_MARKETPLACE_ID=A21TJRUUN4KGV  # India marketplace ID

# Flipkart API (get from Seller Dashboard → Developer Access)
FLIPKART_APP_ID=your_flipkart_app_id
FLIPKART_APP_SECRET=your_flipkart_app_secret

# Meesho (get via email request to meesholink-integration@meesho.com)
MEESHO_REFRESH_TOKEN=your_meesho_refresh_token
MEESHO_SUPPLIER_ID=your_supplier_id
```

---

## 15. Seeding the Database

The seed script (`backend/seed.js`) populates your MongoDB with realistic Indian business data:

**What gets created:**
- 2 users (admin + manager)
- 8 inventory products (electronics, clothing, kitchen, sports, grocery)
- 20 sample orders across all channels and statuses
- 8 Porter delivery orders with tracking event histories
- 8 notifications (new orders, low stock alerts, delivery updates)

```bash
# Run from backend directory
npm run seed

# Output:
# ✅ Connected to MongoDB
# 🗑️  Cleared existing data
# 👤 Users created
# 📦 Inventory created
# 🛒 Orders created
# 🚚 Porter orders created
# 🔔 Notifications created
# ✅ Seed complete!
```

---

## 16. Marketplace Integration Roadmap

This is how we'll connect Amazon, Flipkart, and Meesho to the dashboard:

### Phase 1 (Current) — Internal Orders Only
The dashboard manages orders you create manually or via your own website/store.

### Phase 2 — Amazon Integration
```
1. Get SP-API credentials from Seller Central
2. Build /backend/integrations/amazon.js adapter
3. Schedule a job to pull new orders every 5 minutes:
   GET https://sellingpartnerapi-in.amazon.com/orders/v0/orders
   ?MarketplaceIds=A21TJRUUN4KGV
   &CreatedAfter=<last_sync_time>
4. Normalize Amazon order format → BizFlow Order schema
5. Sync inventory updates back to Amazon
```

### Phase 3 — Flipkart Integration
```
1. Get API credentials from Seller Dashboard → Developer Access
2. Build /backend/integrations/flipkart.js adapter
3. Pull orders: GET https://api.flipkart.net/sellers/v2/orders
4. Update order status back to Flipkart after dispatch
5. Sync SKU inventory counts
```

### Phase 4 — Meesho Integration
```
Option A (Direct): Email meesholink-integration@meesho.com for API tokens
Option B (Middleware): Integrate with Unicommerce or EasyEcom which 
                       already supports Meesho + Amazon + Flipkart
                       through a single unified API
```

### Phase 5 — Unified Channel Panel
A single "All Orders" view that shows orders from all platforms with a `source` badge (Amazon / Flipkart / Meesho / WhatsApp / Website), with the ability to filter, sort, and bulk process across channels.

---

## 17. Future Enhancements

### Short Term
- [ ] WhatsApp order integration (via WhatsApp Business API)
- [ ] PDF invoice generation
- [ ] Bulk order processing (dispatch multiple orders at once)
- [ ] Porter order auto-creation when an order is dispatched
- [ ] SMS/WhatsApp notifications to customers on delivery updates

### Medium Term
- [ ] Mobile app (React Native) for on-the-go order management
- [ ] Barcode scanner for inventory updates
- [ ] Multi-warehouse support
- [ ] Profit & loss reporting (cost price vs selling price)
- [ ] GST report generation

### Long Term
- [ ] AI-powered demand forecasting (predict which products to restock)
- [ ] Automated pricing suggestions based on marketplace trends
- [ ] Multi-seller / franchise support (multiple business units)
- [ ] Integration with Tally / accounting software
- [ ] Customer CRM with purchase history

---

## Quick Reference — Key Contacts

| Service | Support Contact |
|---|---|
| Porter Enterprise | help@porter.in / porter.in/enterprise |
| Amazon SP-API | Seller Central → Apps & Services → Develop Apps |
| Flipkart Seller API | sellerapi-dev-support@flipkart.com |
| Meesho API Access | meesholink-integration@meesho.com |

---

*Document generated for BizFlow v1.0 — React + Node.js + MongoDB*
*Last updated: June 2025*
