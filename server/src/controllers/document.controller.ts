import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import { DocumentService } from '@/services/document.service';
// import { User } from '@interfaces/users.interface';
// import { TestService } from '@services/test.service';

export class DocumentController {
  public controller = Container.get(DocumentService);

  public createDoc = async (req: Request, res: Response, next: NextFunction) => {
    const { docName, user } = req.body;

    try {
      await this.controller.createDoc(docName, user);
      res.send('document created successfully');
    } catch (error) {
      next(error);
    }
  };

  public getDocs = async (req: Request, res: Response, next: NextFunction) => {
    const { user, docType } = req.query as { user: any; docType: any };

    try {
      const callbackfn = documents => {
        return res.json({ documents });
      };

      this.controller.getDocs(user, docType, callbackfn);
    } catch (error) {
      next(error);
    }
  };

  public addSharedDocumentToUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, documentName } = req.body;

    try {
      await this.controller.addSharedDocumentToUser(userId, documentName);
      return res.send('success');
    } catch (error) {
      next(error);
    }
  };

  public getSharedUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { docname } = req.params;

    try {
      const users = await this.controller.getSharedUsers(docname);

      return res.send(users);
    } catch (error) {
      next(error);
    }
  };
  public shareDocumentByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email, documentName } = req.body;

    try {
      const user = await this.controller.shareDocumentByEmail(email, documentName);

      return res.send(user);
    } catch (error) {
      next(error);
    }
  };
}
