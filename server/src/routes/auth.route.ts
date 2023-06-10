import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signin`, this.auth.signIn);
    this.router.get(`${this.path}/me`, this.auth.getUser);
    this.router.get(`${this.path}/test`, (req, res) => {
      res.json({ message: 'welcome to flicker docs' });
    });
  }
}
