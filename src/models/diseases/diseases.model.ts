import * as mongoose from "mongoose";
import DiseaseInterface from "../../interfaces/diseases/disease.interface";
import { commonSchema } from "models/common.model";

const diseaseSchema = commonSchema.clone()
diseaseSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const diseasesModel = mongoose.model<DiseaseInterface & mongoose.Document>('Diseases', diseaseSchema);

export default diseasesModel;
