// server/app.js
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import tripRoute from './routes/trip.route.js'

import passport from 'passport';
import './config/passport.js'
dotenv.config();

const app = express();

app.use(passport.initialize()); 

//  CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Parse cookies
app.use(cookieParser());

// Parse JSON & URL-encoded bodies
app.use(express.json()); // Needed for JSON body
app.use(urlencoded({ extended: true }));



app.use('/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/trip',tripRoute)
// app.use('/api/links',linkRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Snap-Link backend is running!",

  });
});



//Global Error Handler 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export { app };
