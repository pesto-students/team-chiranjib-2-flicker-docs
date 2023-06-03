import { User } from '@/interfaces/users.interface';
import { DocumentModel } from '@/models/document.model';
import { UserModel } from '@/models/users.model';

export class DocumentService {
  public createDoc = async (docName: string, user: User) => {
    try {
      const createDocData = new DocumentModel({
        name: docName,
        displayName: 'new doc',
        createdAt: new Date(),
      });

      const document = await createDocData.save();

      const userData = await UserModel.findOne({ email: user.email });

      userData.documents.push(document._id);
      userData.save();
    } catch (error) {
      console.log(error);
    }
  };

  //   public getDocs = async () => {};

  //   public addSharedDocumentToUser = async () => {};
}
