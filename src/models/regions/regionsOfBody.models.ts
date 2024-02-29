import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const regionsOfBodySchema = commonSchema.clone()

const regionsOfBodyModel = mongoose.model<FieldsInterface & mongoose.Document>('RegionsOfBody', regionsOfBodySchema);

export default regionsOfBodyModel;
