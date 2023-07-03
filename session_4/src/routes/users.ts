import express, { Request, Response } from "express";
import { verifyUser } from "../middlewares/jwt";
import { User } from "../models/user";

const router = express.Router();

router.get('/user', verifyUser, async (req: Request, res: Response) => {
  const { email } = req.currentUser;

  const user = await User.find({email: email}, {password: 0});
  
  const response = {
    message: "User found!",
    user
  }
  res.status(200).send(response)
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
