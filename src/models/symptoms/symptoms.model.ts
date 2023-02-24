import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const symptomsSchema = new mongoose.Schema({
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

const symptomsModel = mongoose.model<fieldsInterface & mongoose.Document>('Symptoms', symptomsSchema);

export default symptomsModel;
