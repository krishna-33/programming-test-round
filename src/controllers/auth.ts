import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../models';


const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json({ id: user.id, name: user.name });
  } catch (error) {
    res.status(400).json({ error: 'Signup failed' });
  }
};

export const signin = async (
  req: Request,
  res: Response
) => {  // Return Promise<void>
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ 
      where: { 
        email,
        password // Consider hashing passwords in real applications
      } 
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return; // Return void instead of response object
    }

    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '1h' } // Add expiration
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' });
  }
};