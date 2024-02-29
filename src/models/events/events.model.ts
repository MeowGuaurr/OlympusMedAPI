import * as mongoose from 'mongoose';
import FieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const eventsSchema = commonSchema.clone()
eventsSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const eventsModel = mongoose.model<FieldsInterface & mongoose.Document>('Events', eventsSchema);

export default eventsModel;
