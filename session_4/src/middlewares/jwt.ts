import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import { iJWT } from "../interfaces/jwt";

export const SECRET_KEY: Secret = process.env.JWT_SECRET ?? "My_Test_JWT_Key";

export const verifyUser = (req: any, res: Response, next: NextFunction) => {
  try {
    let token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      throw new Error("Please add token in request!");
    }
  
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded JWT: ", decoded);
    req.currentUser = decoded as iJWT;
    next();
  } catch (err) {
    console.log("Error - verifyUser: ", err.message)
    res.status(401).send('Invalid token! Unable to validate user!');
  }
}

export const createJWT = (email: string, password: string, userId: string) => {
  try {
    const user = {
      email,
      password,
      userId
    }
    console.log("JWT signing credentials", user);
  
    const token = jwt.sign({ email: user.email, password: user.password, userId: user.userId }, SECRET_KEY, {
      expiresIn: '2 days',
    });

    return token;
  } catch (err) {
    throw new Error(err.message)
  }
}