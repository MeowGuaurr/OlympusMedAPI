import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const recomendationsSchema = commonSchema.clone()
recomendationsSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const recomendationsModel = mongoose.model<FieldsInterface & mongoose.Document>('Recomendations', recomendationsSchema);

export default recomendationsModel;
