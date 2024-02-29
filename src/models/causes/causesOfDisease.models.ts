import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const causesofDiseaseSchema = commonSchema.clone()

const causesOfDiseaseModel = mongoose.model<fieldsInterface & mongoose.Document>('CausesOfDisease', causesofDiseaseSchema);

export default causesOfDiseaseModel;
