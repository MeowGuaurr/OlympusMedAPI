import * as mongoose from "mongoose";
import fieldsInterface from "../../interfaces/fieldsForForm/fields.interface";

const activities = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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

const activitiesModel = mongoose.model<fieldsInterface & mongoose.Document>('Activities', activities);

export default activitiesModel;
