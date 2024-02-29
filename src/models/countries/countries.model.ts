import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const countriesSchema = commonSchema.clone()
countriesSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const countriesModel = mongoose.model<FieldsInterface & mongoose.Document>('Countries', countriesSchema);

export default countriesModel
