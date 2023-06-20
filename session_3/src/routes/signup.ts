import express, { Request, Response } from "express";
import { User } from "../models/user";
import { body } from 'express-validator';

const router = express.Router();

router.post('/signup', 
  [
    body('name').isAlpha(),
    body('email').isAlphanumeric(),
    body('password').isAlphanumeric(),
  ], 
  async (req: Request, res: Response) => {
  console.log("SIGNUP ENTER: ", req.body)
  const user = await User.findOne({
    email: req.body.email
  })

  console.log("User: ", user)

  if (user) {
    res.status(200).send({
      message: "User already exists!"
    });
    return;
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  const createdUser = await User.create(newUser)

  res.status(201).send({
    message: "Signup Successful!",
    user: createdUser
  })
});

export { router as signupRouter };
