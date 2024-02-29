import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const sportSchema = commonSchema.clone()

const sportModel = mongoose.model<fieldsInterface & mongoose.Document>('Sports', sportSchema);

export default sportModel;
