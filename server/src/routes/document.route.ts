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

    this.router.get(`${this.path}/:docName`, this.documentController.getSingleDoc);

    this.router.put(`${this.path}/:id/display-name`, this.documentController.updateDocDisplayName);

    this.router.post(`${this.path}/user`, this.documentController.addSharedDocumentToUser);

    this.router.get(`${this.path}/:docname/shared-users`, this.documentController.getSharedUsers);

    this.router.post(`${this.path}/email/share`, this.documentController.shareDocumentByEmail);
  }
}
