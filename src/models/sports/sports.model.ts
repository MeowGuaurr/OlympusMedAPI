import * as mongoose from 'mongoose';
import fieldsInterface from '../../interfaces/fieldsForForm/fields.interface';

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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

const sportModel = mongoose.model<fieldsInterface & mongoose.Document>('Sports', sportSchema);

export default sportModel;
