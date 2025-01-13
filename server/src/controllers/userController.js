import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        // Check if user already exists
        const user = await User.findOne({ email });
        
        if (user) {
            res.status(400).json({ error: 'User already exists' });
            return;
        };

        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword 
        });
        
        // Save the user to the database
        await newUser.save();

        const data = {
            user: {
                id: newUser._id
            }
        };
        // Generate JWT token
        const token = jwt.sign(
            data,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        success = true;
        res.status(201).json({ success, token });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
        next(err);
    }
};

export const login = async (req, res, next) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() });
    }

    const { username, password } = req.body;
    try {

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ success, error: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const data = {
            user: {
                id: user.id
            }
        };
        success = true;
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // Send the token as a response
        res.json({ success, token });

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
        next(err);
    }
};

