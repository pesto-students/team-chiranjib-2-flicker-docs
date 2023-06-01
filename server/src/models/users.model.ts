import mongoose, { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  picture: {
    type: String,
  },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    },
  ],
});

export const UserModel = model<User & Document>('User', UserSchema);
