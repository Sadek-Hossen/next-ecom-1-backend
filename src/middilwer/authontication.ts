import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user-model";

interface UserPayload {
  email: string;
}

export const authontick = (req: Request, res: Response, next: NextFunction) => {
  const token = (req as any).cookies?.token;
  console.log("this is token from authentics:",token)

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN as string) as UserPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userFromReq = (req as any).user;
  if (!userFromReq) return res.status(401).json({ message: "unauthorized" });

  try {
    const user = await User.findOne({ email: userFromReq.email });
    if (!user) return res.status(401).json({ message: "unauthorized" });

    if (user.role !== "admin") {
      return res.status(403).json({ message: "forbidden access" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
}