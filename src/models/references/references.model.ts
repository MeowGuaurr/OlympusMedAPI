import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const referencesSchema = commonSchema.clone()
referencesSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});
const referencesModel = mongoose.model<FieldsInterface & mongoose.Document>('References', referencesSchema);

export default referencesModel;
