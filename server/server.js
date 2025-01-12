import express from 'express';
import db from './src/utils/db.js';
import menuRouter from './src/routes/menuRoutes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world')
});

app.use('/api/menu', menuRouter);

app.listen(5000, () => {
    console.log('Server running on port 5000');
})