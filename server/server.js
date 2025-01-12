import express from 'express';
import db from './src/utils/db.js';
import menuRouter from './src/routes/menuRoutes.js';
import orderRouter from './src/routes/orderRoutes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world')
});

app.use('/api/menu', menuRouter);
app.use('/api/order', orderRouter);

app.listen(5000, () => {
    console.log('Server running on port 5000');
})