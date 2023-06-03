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
}
