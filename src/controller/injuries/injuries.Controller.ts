import * as express from 'express';
import injuriesInterface from '../../interfaces/injuries/injuries.interface';
import validationMiddleware from '../../validators/middleware.validator';
import CreateInjuriesDto from '../../validators/injuries.dto';
import injuriesModel from '../../models/injuries/injuries.model';

class InjuriesController{
  public path = '/injuries';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/registerInjuries`,validationMiddleware(CreateInjuriesDto), this.createInjuries);
    this.router.get(`${this.path}/getAllInjuries`, this.getAllInjuries);
    this.router.post(`${this.path}/updateInjury`, this.updateInjury);
  }

  private createInjuries(req: express.Request, res: express.Response){
    const injuriesData: injuriesInterface = req.body;
    const createdInjuries = new injuriesModel(injuriesData);
    createdInjuries.save().then(savedInjuries => {
        res.send(savedInjuries);
      })
  }

  private getAllInjuries(req: express.Request, res: express.Response){
    injuriesModel.find().then(injuries => {
        res.send(injuries)
      })
  }

  private updateInjury(req: express.Request, res: express.Response){
    const injuryData : CreateInjuriesDto = req.body;
    injuriesModel.findOneAndUpdate({code: injuryData.code}, injuryData, {new: true})
    .then(injury => {res.send(injury)});
  }

}

export default InjuriesController;
