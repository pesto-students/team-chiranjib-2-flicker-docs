import { Router } from 'express';

// import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { DocumentController } from '@/controllers/document.controller';
// import { AuthMiddleware } from '@middlewares/auth.middleware';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class DocumentRoute implements Routes {
  public path = '/document';
  public router = Router();
  public documentController = new DocumentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.documentController.getDocs);
    this.router.post(`${this.path}`, this.documentController.createDoc);
  }
}
