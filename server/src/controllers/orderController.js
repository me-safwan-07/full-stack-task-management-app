import Order from "../models/Order.js";

export const createOrder = async(req, res, next) => {
    const {items, totalAmount} = req.body;
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    let success = false;

    if (!items || !totalAmount) {
        res.send({ error: 'require all fileds'})
        return;
    };

    try {

        const newOrder = new Order({
            userId: userId,
            items,
            totalAmount,
        });
        
        await newOrder.save();

        success = true;
        res.status(201).json({ success, newOrder});
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
        next(err);
    }
};

export const getOrders = async(req, res, next) => {
    let success = false;
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const orders = await Order.find({ userId });

        if (orders.length === 0) {
            res.status(404).json({ success, message: 'No orders found' });
        }

        success = true;
        res.status(200).json({ success, orders});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
        next(err);
    }
};