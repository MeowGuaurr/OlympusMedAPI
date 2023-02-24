import * as mongoose from "mongoose";
import injuriesInterface from "../../interfaces/injuries/injuries.interface";

const injuriesSchema = new mongoose.Schema({
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
});

const injuriesModel = mongoose.model<injuriesInterface & mongoose.Document>('Injuries', injuriesSchema);

export default injuriesModel;
