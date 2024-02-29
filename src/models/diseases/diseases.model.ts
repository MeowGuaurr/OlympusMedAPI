import * as mongoose from "mongoose";
import diseaseInterface from "../../interfaces/diseases/disease.interface";
import { commonSchema } from "models/common.model";

const diseaseSchema = commonSchema.clone()
diseaseSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const diseasesModel = mongoose.model<diseaseInterface & mongoose.Document>('Diseases', diseaseSchema);

export default diseasesModel;
