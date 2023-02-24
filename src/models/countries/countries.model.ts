import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const countriesSchema = new mongoose.Schema({
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
  code: {
    type: Number,
    required: true,
    unique: true
  },
});

const countriesModel = mongoose.model<fieldsInterface & mongoose.Document>('Countries', countriesSchema);

export default countriesModel
