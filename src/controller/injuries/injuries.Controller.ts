import * as express from 'express';
import injuriesInterface from '../../interfaces/injuries/injuries.interface';
import fieldstInterface from '../../interfaces/fieldsForForm/fields.interface';
import injuryLogInterface from '../../interfaces/injuries/injuryLog.interface';
import validationMiddleware from '../../validators/middleware.validator';
import CreateInjuriesDto from '../../validators/injuries.dto';
import createNewDto from '../../validators/createNew.dto';
import injuriesModel from '../../models/injuries/injuries.model';
import regionsOfBodyModel from '../../models/regions/regionsOfBody.models';
import activitiesModel from '../../models/activities/activities.model';
import causesOfInjuryModel from '../../models/causes/causesOfInjury.model';
import injuryLogModel from '../../models/injuries/injuriesLog.model';
import userModel from '../../models/users/user.models';
import authMiddleware from '../../middleware/auth.middleware';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import createNew from '../../utils/createNew';
import UpdateDataWCode from '../../utils/updateData';
import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
class InjuriesController{
  public path = '/injuries';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/createCause`, authMiddleware, validationMiddleware(createNewDto), this.createCause);
    this.router.post(`${this.path}/registerInjuries`,authMiddleware, validationMiddleware(CreateInjuriesDto), this.createInjuries);
    this.router.get(`${this.path}/getAllInjuries`, this.getAllInjuries);
    this.router.get(`${this.path}/getInjury/:id`, this.getInjury);
    this.router.post(`${this.path}/updateInjury`, this.updateInjury);
    this.router.post(`${this.path}/createCause`, authMiddleware, validationMiddleware(createNewDto), this.createCause);
    this.router.post(`${this.path}/createRegionOfBody`, authMiddleware, validationMiddleware(createNewDto), this.createRegion);
    this.router.post(`${this.path}/createActivity`, authMiddleware, validationMiddleware(createNewDto), this.createActivity);
  }

  private createInjuries(req: RequestWithUser, res: express.Response, next: express.NextFunction){
    const injuriesData: injuriesInterface = req.body;
    createNew(req, res, injuriesModel, injuriesData, next);
  }

  private createInjuryLog = async(req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const DiseaseLogData : injuryLogInterface = req.body;
    const user = await userModel.findOne({_id: req.user._id});
    const userInfo = await user.populate('createdBy', '-password');

    if(userInfo.role === 'ADMIN'){
      const createdLog = new injuryLogModel({
        ...DiseaseLogData,
        athlete: req.body.athlete,
        createdBy: req.user._id,
        createdAt: Date.now()
      });
      await createdLog.populate('athlete', '-password');
      await createdLog.populate('sport', 'name');
      await createdLog.populate('event', 'name');
      await createdLog.populate('activity', 'name');
      await createdLog.populate('regionOfBodyAffected', 'name');
      await createdLog.populate('diagnostic', 'name');
      await createdLog.populate('cause', 'name');
      await createdLog.populate('mainTreatment', 'name');
      await createdLog.populate('reference', 'name');
      await createdLog.populate('recomendations', 'name');

      const savedLog = await createdLog.save();
      await savedLog.populate('createdBy', 'athlete');
      console.log(createdLog)
      res.send(createdLog);
    } else{
      next (new NotAuthorizedException());
    }
  }

  private getInjury(req: express.Request, res:express.Response, next: express.NextFunction){
    const id = req.params.id;
    injuriesModel.findById(id).then(injury => {
      if(injury){
        res.send(injury)}
        else{
          res.send("Not found");
        }
    })
  }

  private getAllInjuries(req: express.Request, res: express.Response){
    injuriesModel.find().then(injuries => {
        res.send(injuries)
      })
  }

  private updateInjury(req: RequestWithUser, res: express.Response, next: express.NextFunction){
    const injuryData : CreateInjuriesDto = req.body;
    UpdateDataWCode(req, res, injuriesModel, injuryData, next)
  }

  private createCause(req: RequestWithUser, res: express.Response, next: express.NextFunction){
    const newData: fieldstInterface = req.body;
    createNew(req, res, causesOfInjuryModel, newData, next);
  }

  private createRegion(req: RequestWithUser, res: express.Response, next: express.NextFunction){
    const regionData: fieldstInterface = req.body;
    createNew(req, res, regionsOfBodyModel, regionData, next)
  }

  private createActivity(req: RequestWithUser, res: express.Response, next: express.NextFunction){
    const activityData: fieldstInterface = req.body;
    createNew(req, res, activitiesModel, activityData, next)
  }


}

export default InjuriesController;
