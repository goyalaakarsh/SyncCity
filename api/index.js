import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to MongoDB!");
    }).catch((err) => {
        console.log(err);
    }
)

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);

