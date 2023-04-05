import * as express from "express";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import SomethingWentWrong from "../exceptions/SomethingWentWrong";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import userModel from "../models/users/user.models";

async function createNew(req: RequestWithUser, res: express.Response, model: any, newData: any, next: express.NextFunction) {
  const user = await userModel.findOne({_id: req.user._id});
  const userInfo = await user.populate('email', '-password');
  if( userInfo.role === 'ADMIN') {
    try {
        const createdData = new model({
          ...newData,
          active: true,
          createdBy: req.user._id,
        });

        const savedData = await createdData.save();
        await savedData.populate('createdBy', '-password');
        res.send(savedData)
      } catch (error){
        next( new SomethingWentWrong());
      }
  }else{
    next ( new NotAuthorizedException());
  }
}

export default createNew
