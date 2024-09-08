import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import departmentRouter from './routes/department.route.js'; 
import projectRouter from './routes/project.route.js';
import taskRouter from './routes/task.route.js';
import chatRouter from './routes/chat.route.js';
import cookieParser from 'cookie-parser';
import summarizerRouter from './routes/summarizer.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import resourceRouter from './routes/resource.route.js';
import notificationRouter from './routes/notification.route.js';

import cors from 'cors';

// import ReactDOM from 'react-dom';
// import AppRoutes from './Routes'



dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to MongoDB!");
    }).catch((err) => {
        console.log(err);
    }
)

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: ' http://localhost:5173',  // Replace with your frontend's URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,  // Allow cookies or authentication to be passed along
}));


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/department", departmentRouter);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter);
app.use('/api/aiml', summarizerRouter);
app.use('/api/chat', chatRouter)
app.use('/api/dashboard', dashboardRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/notification', notificationRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err);

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});