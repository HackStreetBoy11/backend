import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
dotenv.config();
import userRoute from './routes/User.js'
import cookieParser from 'cookie-parser'
const app = express();
connectDB();
import path from 'path';
import { fileURLToPath } from 'url';
import restrictToLoggedinUserOnly from './middlewares/auth.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/user', userRoute)
app.get('/home', restrictToLoggedinUserOnly, (req, res) => {
    res.render('home')
})
app.get("/signup", (req, res) => {
    return res.render('signup')
})
app.get('/login', (req, res) => {
    return res.render('login')
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
