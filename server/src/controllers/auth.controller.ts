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
}
