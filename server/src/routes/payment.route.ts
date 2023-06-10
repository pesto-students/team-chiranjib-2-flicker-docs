import { Router } from 'express';

// import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { PaymentController } from '@/controllers/payment.controller';
// import { AuthMiddleware } from '@middlewares/auth.middleware';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class PaymentRoute implements Routes {
  public path = '/payment';
  public router = Router();
  public paymentController = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/verify/:email`, this.paymentController.verifyPayment);
  }
}
