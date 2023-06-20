import express, { Request, Response } from "express";
import { verifyUser } from "../middlewares/jwt";
import { User } from "../models/user";

const router = express.Router();

router.get('/user', verifyUser, async (req: Request, res: Response) => {
  const { email } = req.currentUser;

  const user = await User.find({email: email}, {password: 0});
  
  const response = {
    status: "User found!",
    user
  }
  res.status(200).send(response)
});

router.post('/user', async (req: Request, res: Response) => {
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

router.put('/user', verifyUser, async (req: Request, res: Response) => {
  const queryObj = {
    email: req.currentUser.email
  };

  const updateObj = {
    name: req.body.name
  }

  const updatedUser = await User.findOneAndUpdate(queryObj, updateObj, { new: true })

  res.status(200).send({
    message: "Successfully updated user",
    user: updatedUser
  })
});

router.delete('/user', verifyUser, async (req: Request, res: Response) => {
  const queryObj = {
    email: req.currentUser.email
  };

  const deletedUser = await User.findOneAndDelete(queryObj);

  res.status(200).send({
    message: "Successfully deleted user!",
    user: deletedUser
  })
});

export { router as userRouter };
