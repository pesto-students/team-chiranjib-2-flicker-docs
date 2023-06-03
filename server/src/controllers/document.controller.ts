import { HttpException } from '@/exceptions/httpException';
import { DocumentModel } from '@/models/document.model';
import { UserModel } from '@/models/users.model';
import { DocumentService } from '@/services/document.service';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { Container } from 'typedi';
// import { User } from '@interfaces/users.interface';
// import { TestService } from '@services/test.service';

export class DocumentController {
  public controller = Container.get(DocumentService);

  public createDoc = async (req: Request, res: Response, next: NextFunction) => {
    const { docName, user } = req.body;

    try {
      await this.controller.createDoc(docName, user);
      res.send();
    } catch (error) {
      next(error);
    }
  };

  public getDocs = async (req: Request, res: Response) => {
    const { user, docType } = req.query as { user: any; docType: any };

    const getQuery = (fieldName: string | string[]) => {
      return UserModel.findOne({ email: user?.email }).populate(fieldName);
    };

    let query: any;

    if (+docType === 0) {
      query = getQuery(['documents', 'sharedDocuments']);
    } else if (+docType === 1) {
      query = getQuery('documents');
    } else if (+docType === 2) {
      query = getQuery('sharedDocuments');
    }

    if (query) {
      query.exec((err, user) => {
        if (err) return;
        if (!user) return;

        let documents: any;
        if (+docType === 0) {
          documents = [...user.documents, ...user.sharedDocuments];
        } else if (+docType === 1) {
          documents = user.documents;
        } else if (+docType === 2) {
          documents = user.sharedDocuments;
        }
        return res.json({ documents });
      });
    }
  };

  public addSharedDocumentToUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, documentName } = req.body;

    try {
      const user = await UserModel.findById(userId);
      if (!user) throw new HttpException(404, 'User not found');

      const document = await DocumentModel.findOne({ name: documentName });
      if (!document) throw new HttpException(404, 'Document not found');

      const documentId = user.documents.find(doc => new mongoose.Types.ObjectId(doc).equals(document._id));
      if (documentId) throw new HttpException(400, 'You are the owner of the document');

      const sharedDocumentId = user.sharedDocuments.find(doc => new mongoose.Types.ObjectId(doc).equals(document._id));
      if (sharedDocumentId) throw new HttpException(400, 'Document already shared');

      user.sharedDocuments.push(document._id);
      user.save();

      return res.send('success');
    } catch (error) {
      next(error);
    }
  };
}
