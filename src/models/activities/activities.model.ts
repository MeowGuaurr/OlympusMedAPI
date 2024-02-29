import * as mongoose from "mongoose";
import fieldsInterface from "../../interfaces/fieldsForForm/fields.interface";
import { commonSchema } from "models/common.model";

const activities = commonSchema.clone()

const activitiesModel = mongoose.model<fieldsInterface & mongoose.Document>('Activities', activities);

export default activitiesModel;
