import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const causesOfInjurySchema = new mongoose.Schema({
  name: {
    type: String,
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

const causesOfInjuryModel = mongoose.model<fieldsInterface & mongoose.Document>('CausesofInjury', causesOfInjurySchema);

export default causesOfInjuryModel;
