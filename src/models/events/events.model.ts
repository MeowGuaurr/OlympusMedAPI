import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const eventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: Number,
  active: Boolean,
  createdBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: Date,
  updatedBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  updatedAt: Date,
});

const eventsModel = mongoose.model<fieldsInterface & mongoose.Document>('Events', eventsSchema);

export default eventsModel;
