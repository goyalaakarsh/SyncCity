import Sendbird from 'sendbird';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { getSendbirdObject } from '../utils/helper.js';
import SendBird from 'sendbird';
export const test = (req, res) => {
    res.json({
        message: 'API route is working',
    });
}

export const signup = async (req, res, next) => {
    const {name, email, password, role, projectId, depId} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); 
    const newUser = new User({name, email, password: hashedPassword, role, projectId, depId});
    
    try {
        await newUser.save();
        const sb = getSendbirdObject();
        await sb.connect(newUser.id.toString());   
         
        const nickname = newUser.name
        const user = await sb.updateCurrentUserInfo(nickname, null, (resonse, error) => {});

        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
    
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials'));

        const payload = {
            id: validUser._id,
            name: validUser.name,
            email: validUser.email,
            role: validUser.role,
            avatar: validUser.avatar
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,  
        }).status(200).json({ ...rest, role: validUser.role });

    } catch (error) {
        next(error);
    }
}


export const logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    console.log("Google Modal triggered");
    try {
        const user = await User.findOne({email: req.body.email});

        console.log(user);

        if (user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                name: req.body.name, 
                email: req.body.email, 
                password: hashedPassword, 
                avatar: req.body.photo,
                // role: 'user' // Set a default role for new users
            });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            
            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            }).status(200).json(rest);
        }
    } catch (error) {
        console.error('Error in Google OAuth:', error);
        res.status(500).json({success: false, message: error.message});
    }
}