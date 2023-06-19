import express, { Request, Response } from "express";
import { verifyUser } from "../middlewares/jwt";

const router = express.Router();

router.get('/user', verifyUser, async (req: Request, res: Response) => {
  const { email } = req.currentUser;
  
  const response = {
    user: "User verified",
    email
  }
  res.status(200).send(response)
});

router.post('/user', verifyUser, async (req: Request, res: Response) => {
  res.status(201).send({
    user: "user created successfully " + process.env.MONGO_URI
  })
});

router.put('/user', verifyUser, async (req: Request, res: Response) => {
  res.status(201).send({
    user: "user updated successfully " + process.env.MONGO_URI
  })
});

router.delete('/user', verifyUser, async (req: Request, res: Response) => {
  res.status(201).send({
    user: "user deleted successfully " + process.env.MONGO_URI
  })
});

export { router as userRouter };
