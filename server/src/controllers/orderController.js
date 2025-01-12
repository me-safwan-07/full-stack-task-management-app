import Order from "../models/Order.js";

export const createOrder = async(req, res, next) => {
    const { userId, items, totalAmount, status} = req.body;

    try {
        if (!userId || !items || !totalAmount || !status) {
            res.send({ error: 'require all fileds'})
            return;
        };

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            status
        });

        if (!newOrder) {
            res.status(404).json({ error: ' not found ' });
        }

        await newOrder.save();

        res.status(200).json({ message: 'created Order', newOrder});
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
        next(err);
    }
};

export const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
        next(err);
    }
};