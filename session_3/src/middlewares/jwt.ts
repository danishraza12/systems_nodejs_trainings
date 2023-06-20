import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';

export const SECRET_KEY: Secret = process.env.JWT_SECRET ?? "My_Test_JWT_Key";


export const verifyUser = (req: any, res: Response, next: NextFunction) => {
  try {
    let token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      throw new Error("Please add token in request!");
    }
  
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded JWT: ", decoded);
    req.currentUser = decoded;
    next();
  } catch (err) {
    console.log("Error - verifyUser: ", err.message)
    res.status(401).send('Invalid token! Unable to validate user!');
  }
}

export const createJWT = (email: string, password: string) => {
  try {
    const user = {
      email,
      password
    }
    console.log("User", user);
  
    const token = jwt.sign({ email: user.email, password: user.password }, SECRET_KEY, {
      expiresIn: '2 days',
    });

    return token;
  } catch (err) {
    throw new Error(err.message)
  }
}