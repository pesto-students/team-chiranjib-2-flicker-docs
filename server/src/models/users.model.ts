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
  sharedDocuments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    },
  ],
  subscription: {
    subscriptionId: {
      type: String,
    },
    customerId: {
      type: String,
    },
    priceId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    created: {
      type: Number,
    },
    current_period_start: {
      type: Number,
    },
    current_period_end: {
      type: Number,
    },
  },
});

export const UserModel = model<User & Document>('User', UserSchema);
