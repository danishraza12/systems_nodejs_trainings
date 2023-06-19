import express from 'express'
import { json } from 'body-parser'
import * as dotenv from 'dotenv';
import { userRouter } from './routes/users'
import { loginRouter } from './routes/login'

const app = express();
app.use(json())
dotenv.config()

app.use(userRouter);
app.use(loginRouter);

const port = 5001;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});