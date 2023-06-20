import express from 'express'
import { json } from 'body-parser'
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/users'
import { loginRouter } from './routes/login'
import { signupRouter } from './routes/signup';

const app = express();
app.use(json())
dotenv.config()

app.use(userRouter);
app.use(loginRouter);
app.use(signupRouter);

const port = 5001;


const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Please add mongo URI");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.log('Error - start|MongoDB', err.message);
  }
  
  app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
  });
};

start();