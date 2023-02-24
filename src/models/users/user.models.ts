import * as mongoose from "mongoose";
import User from "../../interfaces/authInterface";
import ROLES from "./roles";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  job:String,
  active: Boolean,
  role: {
    type: String,
    default: ROLES.GUEST,
    ROLES
  },
  createdAt: Date,
  createdBy: String,
  updatedBy: String,
  updatedAt: Date
});



const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
