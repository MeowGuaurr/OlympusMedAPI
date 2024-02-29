import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const sportSchema = commonSchema.clone()

const sportModel = mongoose.model<FieldsInterface & mongoose.Document>('Sports', sportSchema);

export default sportModel;
