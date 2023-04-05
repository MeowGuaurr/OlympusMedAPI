import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const recomendationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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

const recomendationsModel = mongoose.model<fieldsInterface & mongoose.Document>('Recomendations', recomendationsSchema);

export default recomendationsModel;
