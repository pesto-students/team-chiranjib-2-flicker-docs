import mongoose, { model, Schema, Document } from 'mongoose';
import { DocumentInterface } from '@interfaces/document.interface';

const DocumentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: mongoose.SchemaTypes.Mixed,
  },
  displayName: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const DocumentModel = model<DocumentInterface & Document>('Document', DocumentSchema);
