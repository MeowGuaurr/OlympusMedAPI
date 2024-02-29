import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const referencesSchema = commonSchema.clone()
referencesSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});
const referencesModel = mongoose.model<fieldsInterface & mongoose.Document>('References', referencesSchema);

export default referencesModel;
