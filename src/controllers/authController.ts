import { Request, Response } from "express";
import * as authService from "../services/authService.js"
export interface User {
        email: string;
        password: string;
}
export async function signUp(req: Request, res: Response) {
  const { email, password } : User = req.body;
  const token = await authService.signUp({email, password});
  res.status(201).send({ token });

}

export async function signIn(req: Request, res: Response) {
  const { email, password } : User = req.body;
  console.log("entrei")
  const token = await authService.signIn({email, password});
  res.status(200).send({ token });
      
}

