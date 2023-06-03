import { DocumentModel } from '@/models/document.model';
import { UserModel } from '@/models/users.model';
import { NextFunction, Request, Response } from 'express';
// import { Container } from 'typedi';
// import { User } from '@interfaces/users.interface';
// import { TestService } from '@services/test.service';

export class DocumentController {
  public createDoc = async (req: Request, res: Response, next: NextFunction) => {
    const { docName, user } = req.body;

    try {
      const createDocData = new DocumentModel({
        name: docName,
        displayName: 'new doc',
        createdAt: new Date(),
      });

      const document = await createDocData.save();

      const userData = await UserModel.findOne({ email: user.email });

      if (userData?.documents?.length > 0) {
        userData.documents.push(document._id);
        userData.save();
      }

      res.send();
    } catch (error) {
      next(error);
    }
  };

  public getDocs = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.query;

    // @ts-ignore
    UserModel.findOne({ email: user?.email })
      .populate('documents')
      .exec((err, user) => {
        if (err) return;

        if (!user) return;

        return res.json({ documents: user.documents });
      });
  };
}
