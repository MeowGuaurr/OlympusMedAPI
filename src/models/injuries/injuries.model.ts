import * as mongoose from "mongoose";
import injuriesInterface from "../../interfaces/injuries/injuries.interface";
import { commonSchema } from "models/common.model";

const injuriesSchema = commonSchema.clone()
injuriesSchema.add({
  code: {
    type: Number,
    required: true,
    unique: true
  }
});

const injuriesModel = mongoose.model<injuriesInterface & mongoose.Document>('Injuries', injuriesSchema);

export default injuriesModel;
