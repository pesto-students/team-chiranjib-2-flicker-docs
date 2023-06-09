import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { PaymentService } from '@services/payment.service';

export class PaymentController {
  public payment = Container.get(PaymentService);

  public verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      const userWithPaymentDetails: User = await this.payment.verifyPayment(email);

      res.status(201).json({ user: userWithPaymentDetails, message: 'Payment successfull' });
    } catch (error) {
      next(error);
    }
  };
}
