import { NextFunction, request, Response} from "express";
import userModel from "../models/users/user.models";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

async function roleMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const user = await userModel.findOne({_id: req.user._id});
  const userInfo = await user.populate('email','-password');

  if (userInfo.role === 'ADMIN' || userInfo.role === 'SUPERVISOR'){
    res.send(true)
  } else{
    next(new NotAuthorizedException());
  }
}

export default roleMiddleware;
