import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const causesofDiseaseSchema = commonSchema.clone()

const causesOfDiseaseModel = mongoose.model<FieldsInterface & mongoose.Document>('CausesOfDisease', causesofDiseaseSchema);

export default causesOfDiseaseModel;
