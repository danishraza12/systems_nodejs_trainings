import express, { Request, Response } from "express";
import { createJWT } from "../middlewares/jwt";
import { User } from "../models/user";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("LOGIN Request", req.body);

  const user = await User.findOne({
    email: req.body.email,
  });
  console.log("User: ", user);

  if (email !== user?.email && password !== user?.password) {
    res.status(200).send({
      message: "Invalid email or password",
    });
  }

  const token = createJWT(req.body.email, req.body.password);

  const response = {
    message: "Login Successfull!",
    email: req.body.email,
    idtoken: token,
  };

  console.log("Response: ", response);
  res.status(200).send(response);
});

export { router as loginRouter };
