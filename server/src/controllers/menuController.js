import Menu from "../models/Menu.js";

export const getAllMenuItems = async (req, res, next) => {
    let success = false;
    try {
        const menuItems = await Menu.find({});
        success = true;
        res.json({success, menuItems});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
        next(err);
    }
};

export const CreateMenu = async(req, res, next) => {
    const { name, category, price, availability } = req.body;
    try {
        if (!name || !category || !price || !availability) {
            res.status(400).json({ error: 'All fields are required'});
            return;
        }

        //  check if the menu name already exists
        const menunameAvaliable = await Menu.findOne({ name });
        if (menunameAvaliable) {
            res.status(400).json({ error: 'Menu name already exists'});
            return;
        }

        const newMenu = new Menu({ 
            name,
            category,
            price,
            availability
        });

        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: 'Error creating menu'});
        next(err);
    }
};

export const updateMenuById = async(req, res, next) => {
    const { id } = req.params;
    const { name, category, price, availability } = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(
            id,
            { name, category, price, availability},
            { new: true, runValidators: true}
        );
        
        if (!updatedMenu) {
            return res.status(404).json({ error: 'Menu not found'});
        }
        
        res.status(200).json({ message: 'Menu item updated successfully', updatedMenu});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
        next(err);
    }
}

// menu delete the menu
export const deleteMenuById = async(req, res, next) => {
    const { id } = req.params;

    try {
        const delMenu = await Menu.findByIdAndDelete(id);

        if(!delMenu) {
            return res.status(404).json({ error: 'Menu not found'});
        }

        res.json({ message: 'Menu deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
        next(err);
    }
};