import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const treatmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: Number,
    required: true,
    unique: true
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

const treatmentsModel = mongoose.model<fieldsInterface & mongoose.Document>('Treatments', treatmentsSchema);

export default treatmentsModel;
