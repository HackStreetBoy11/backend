import User from '../models/User.js';
import { v4 as uuid } from 'uuid';

import { setUser } from '../service/auth.js'

// Signup function
export async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    return res.render('home');
}

// Login function
export async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }); // use findOne instead of find
    if (!user) {
        return res.render('login', { error: "Invalid email or password" });
    }
    const sessionId = uuid();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.render('home');
}
