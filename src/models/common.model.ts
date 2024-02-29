import * as mongoose from 'mongoose';
import commonInterface from 'interfaces/commonInterface';

export const commonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  active: Boolean,
  createdBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: Date,
  updatedBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  updatedAt: Date,
});

export const commonModel = mongoose.model<commonInterface & mongoose.Document>('Common', commonSchema);

