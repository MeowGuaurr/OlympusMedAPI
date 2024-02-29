import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const symptomsSchema = commonSchema.clone()
const symptomsModel = mongoose.model<fieldsInterface & mongoose.Document>('Symptoms', symptomsSchema);

export default symptomsModel;
