import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const causesofDiseaseSchema = new mongoose.Schema({
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

const causesOfDiseaseModel = mongoose.model<fieldsInterface & mongoose.Document>('CausesOfDisease', causesofDiseaseSchema);

export default causesOfDiseaseModel;
