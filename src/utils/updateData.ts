import * as express from "express";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import SomethingWentWrong from "../exceptions/SomethingWentWrong";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import userModel from "../models/users/user.models";

async function UpdateDataWCode(req: RequestWithUser, res: express.Response, model: any, newData: any, next: express.NextFunction){
  const user = await userModel.findOne({_id: req.user._id});
  const userInfo = await user.populate('email', '-password');
  if( userInfo.role === 'ADMIN'){
    try{
      const doc = await model.findOne({code: newData.code})
      const update = {name: newData.name, active: newData.active, updatedAt: Date.now(), updatedBy: req.user._id}
      await doc.updateOne(update);

      const updatedData = await model.findOne({code: newData.code});
      updatedData.update;
      res.send(newData);
    }
     catch(error){
      next(new SomethingWentWrong());
    }
  }
  else{
    next(new NotAuthorizedException());
  }
}

export default UpdateDataWCode
