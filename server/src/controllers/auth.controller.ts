import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { credential } = req.body;
      const signUpUserData: User = await this.auth.signIn(credential);

      res.status(201).json({ user: signUpUserData, message: 'Signup was successful' });
    } catch (error) {
      next(error);
    }
  };
  public signInWithEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const signUpUserData: User = await this.auth.signInWithEmail(email, password);

      res.status(201).json({ user: signUpUserData, message: 'Signup was successful' });
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const signUpUserData: User = await this.auth.getUser(authorization);

      res.status(201).json({ user: signUpUserData, message: 'user found' });
    } catch (error) {
      next(error);
    }
  };
}
