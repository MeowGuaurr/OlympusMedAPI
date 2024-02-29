import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const causesOfInjurySchema = commonSchema.clone()

const causesOfInjuryModel = mongoose.model<fieldsInterface & mongoose.Document>('CausesofInjury', causesOfInjurySchema);

export default causesOfInjuryModel;
