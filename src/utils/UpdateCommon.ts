import * as express from "express";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import SomethingWentWrong from "../exceptions/SomethingWentWrong";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import userModel from "../models/users/user.models";

async function updateData(req: RequestWithUser, res: express.Response, model: any, newData: any, next: express.NextFunction){
  const user = await userModel.findOne({_id: req.user._id});
  const userInfo = await user.populate('email', '-password');
  if( userInfo.role === 'ADMIN'){
    try{
      const doc = await model.findOne({code: newData.code})
    }catch(error){
      next(new SomethingWentWrong());
    }
  }
}
