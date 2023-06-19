import express, { Request, Response } from "express";
import { createJWT } from "../middlewares/jwt";

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  console.log("LOGIN Request", req.body);

  const token = createJWT(req.body.email, req.body.password);

  const response = {
    email: req.body.email,
    idtoken: token
  };

  console.log("Response: ", response)
  res.status(200).send(response);
});



export { router as loginRouter };
