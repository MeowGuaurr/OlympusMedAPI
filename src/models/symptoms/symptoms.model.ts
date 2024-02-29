import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const symptomsSchema = commonSchema.clone()
const symptomsModel = mongoose.model<FieldsInterface & mongoose.Document>('Symptoms', symptomsSchema);

export default symptomsModel;
