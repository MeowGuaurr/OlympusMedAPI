import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';
import { commonSchema } from 'models/common.model';

const eventsSchema = commonSchema.clone()
eventsSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const eventsModel = mongoose.model<fieldsInterface & mongoose.Document>('Events', eventsSchema);

export default eventsModel;
