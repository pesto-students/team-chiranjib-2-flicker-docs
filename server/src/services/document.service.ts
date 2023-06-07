import { HttpException } from '@/exceptions/httpException';
import { User } from '@/interfaces/users.interface';
import { DocumentModel } from '@/models/document.model';
import { UserModel } from '@/models/users.model';
import mongoose from 'mongoose';
import { Service } from 'typedi';

@Service()
export class DocumentService {
  public createDoc = async (docName: string, user: User) => {
    const createDocData = new DocumentModel({
      name: docName,
      displayName: 'new doc',
      createdAt: new Date(),
    });

    const document = await createDocData.save();

    const userData = await UserModel.findOne({ email: user.email });

    userData.documents.push(document._id);
    userData.save();
  };

  public getDocs = (user: any, docType: string, cb: any) => {
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
      let documents: any;
      query.exec((err, user) => {
        if (err) return;
        if (!user) return;

        if (+docType === 0) {
          documents = [...user.documents, ...user.sharedDocuments];
        } else if (+docType === 1) {
          documents = user.documents;
        } else if (+docType === 2) {
          documents = user.sharedDocuments;
        }
        cb(documents);
      });
    }
  };

  public getSingleDoc = async (docName: string) => {
    const doc = await DocumentModel.findOne({ name: docName });

    if (!doc) throw new HttpException(404, 'Document not found');

    return doc;
  };

  public updateDocDisplayName = async (id: string, newDocDisplayName: string) => {
    const doc = await DocumentModel.findById(id);

    if (!doc) throw new HttpException(404, 'Document not found');

    doc.displayName = newDocDisplayName;
    await doc.save();

    return;
  };

  public addSharedDocumentToUser = async (userId, documentName) => {
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
  };

  public getSharedUsers = async (documentName: string) => {
    const document = await DocumentModel.findOne({ name: documentName });
    if (!document) throw new HttpException(404, 'Document not found');

    const ownerPromise = UserModel.find({ documents: document._id }).exec();
    const sharedUsersPromise = UserModel.find({ sharedDocuments: document._id }).exec();

    const [owners, sharedUsers] = await Promise.all([ownerPromise, sharedUsersPromise]);
    return { owners, sharedUsers };
  };

  public shareDocumentByEmail = async (email: string, documentName: string) => {
    const document = await DocumentModel.findOne({ name: documentName });

    if (!document) throw new HttpException(404, 'Document not found');

    const newUser = new UserModel({
      name: email.split('@')[0],
      email,
      sharedDocuments: [document._id],
    });

    await newUser.save();

    return newUser;
  };
}
