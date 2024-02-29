import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import validationMiddleware from '../validators/middleware.validator';
import CreateUserDto from '../validators/user.dto';
import LogInDto from '../validators/logIn.dto';
import UpdateUserDto from '../validators/updateUser.dto';
import TokenData from'../interfaces/tokenData.interface'
import User from '../interfaces/authInterface';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from 'interfaces/requestWithUser.interface';
import userModel from '../models/users/user.models';
import EmailAlreadyExistsException from '../exceptions/EmailAlreadyExists';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import authMiddleware from '../middleware/auth.middleware';


class AuthController{
  public path = '/auth'
  public router = express.Router();
  private readonly user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/register`,authMiddleware, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, this.logIn)
    this.router.get(`${this.path}/getAll`, this.getAllUsers);
    this.router.post(`${this.path}/updateUser`, authMiddleware, this.updateUser);
    this.router.get(`${this.path}/getUser/:id`, this.getUser);
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (req:  RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = req.body;
    if(await this.user.findOne({email: userData.email})){
      next(new EmailAlreadyExistsException(userData.email));
    }

    else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
        createdAt: Date.now(),
        createdBy: req.user._id
      });
      userData.password = undefined;
      const tokenData = this.createToken(user);
      res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      res.send(user);
    }
  }


  private logIn = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const logInData: LogInDto = req.body;
    const user = await this.user.findOne({email: logInData.email});
    if(user){
      const PasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if(PasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        res.send({user, access: tokenData});
      }
      else{
        next(new WrongCredentialsException());
      }
    } else{
      next(new WrongCredentialsException());
    }
  }

  private loggingOut = (req: express.Request, res: express.Response) => {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    res.sendStatus(200);
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: User): TokenData{
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, {expiresIn}),
    }
  }

  private getAllUsers(req: express.Request, res: express.Response){
    userModel.find().then(users => {
        res.send(users)
      })
  }

  private getUser(req: express.Request, res:express.Response, next: express.NextFunction){
    const id = req.params.id;
    userModel.findById(id).then(user => {
      if(user){
        res.send(user)}
        else{
          next(UserNotFoundException);
        }
    })
  }

  private updateUser = async (req: RequestWithUser, res: express.Response) => {
    const userData: UpdateUserDto = req.body;
    const user = await this.user.findOne({_id: req.user._id});
    const userInfo = await user.populate('email','-password');

    console.log(userInfo);

    if(userInfo.role === 'ADMIN'){
      const doc = await this.user.findOne({email: userData.email});
      const update = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    job: userData.job,
                    active : userData.active,
                    role: userData.role,
                    updatedAt: Date.now(),
                    updatedBy: req.user._id
                    }

      await doc.updateOne(update);
      res.send("User updated successfully")

                  }
    else{
      res.send("NOT ALLOWED");
    }
  }

}

export default AuthController;
