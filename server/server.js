import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes
import menuRouter from './src/routes/menuRoutes.js';
import orderRouter from './src/routes/orderRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import connectDB from './src/utils/db.js';
import authMiddleware from './src/middleware/authMiddleware.js';

// Load environment variables from.env file
dotenv.config();

// Initialize express app and middleware
const app = express();
const PORT = process.env.PORT || 5000;
const BASE_API_URL = process.env.BASE_API_URL || '/api/v1';
// Middleware setup
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
    allowedHeaders: ['Authorization', 'Content-Type'], // Allow Authorization header
};

app.use(cors(corsOptions));

// Connect to MongoDB database
connectDB();

// Test route
app.get('/', (req, res) => {
    res.send('Hello, welcome to the food delevey management server')
});

// Use routes
app.use(`${BASE_API_URL}/auth`, userRouter);
app.use(`${BASE_API_URL}/menu`, authMiddleware, menuRouter);
app.use(`${BASE_API_URL}/order`, authMiddleware, orderRouter);
// console.log(`${BASE_API_URL}`)
// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

app.listen(5000, () => {
    console.log('Server running on port 5000');
});