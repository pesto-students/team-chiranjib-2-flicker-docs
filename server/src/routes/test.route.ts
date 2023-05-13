import { Router } from 'express';
import { TestController } from '@controllers/test.controller';
// import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
// import { AuthMiddleware } from '@middlewares/auth.middleware';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class TestRoute implements Routes {
  public path = '/test';
  public router = Router();
  public test = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.test.getData);
  }
}
