import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const treatmentsSchema = commonSchema.clone()
treatmentsSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const treatmentsModel = mongoose.model<FieldsInterface & mongoose.Document>('Treatments', treatmentsSchema);

export default treatmentsModel;
