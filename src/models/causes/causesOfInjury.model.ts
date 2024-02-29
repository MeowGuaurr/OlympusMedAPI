import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const causesOfInjurySchema = commonSchema.clone()

const causesOfInjuryModel = mongoose.model<FieldsInterface & mongoose.Document>('CausesofInjury', causesOfInjurySchema);

export default causesOfInjuryModel;
