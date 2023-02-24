import * as mongoose from "mongoose";
import diseaseInterface from "../../interfaces/diseases/disease.interface";

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true,
    unique: true
  },
  active: Boolean,
  createdAt: Date,
  createdBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
});

const diseasesModel = mongoose.model<diseaseInterface & mongoose.Document>('Diseases', diseaseSchema);

export default diseasesModel;
