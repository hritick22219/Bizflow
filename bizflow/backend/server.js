// Import required packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/db');

// Import route files
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/orders');

// Import simulation function
//const generateOrder = require('./simulation/services/ordergenerator');

// Create Express app
const app = express();


// ======================
// Middlewares
// ======================

// Allow frontend to communicate with backend
app.use(cors());

// Parse incoming JSON data
app.use(express.json());


// ======================
// Connect MongoDB
// ======================

connectDB();


// ======================
// API Routes
// ======================

// Inventory APIs
app.use('/api/inventory', inventoryRoutes);

// Order APIs
app.use('/api/orders', orderRoutes);


// ======================
// Simulation Engine
// ======================

// Every 5 seconds create a fake order
// setInterval(() => {
//     generateOrder();
// }, 15000);


// ======================
// Default Route
// ======================

app.get('/', (req, res) => {
    res.send('BizFlow Backend Running');
});


// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});