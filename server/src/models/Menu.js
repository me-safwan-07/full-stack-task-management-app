import mongoose from "mongoose";

const MenuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
});

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;