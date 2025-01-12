import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {

            menu: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: true
            },
            quantity: {
                type: Number,
                min: 1,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model("Order", OrderSchema);

export default Order;