import * as express from 'express';
import validationMiddleware from '../../validators/middleware.validator';
import CreateDiseaseDto from '../../validators/diseases.dto';
import CreateDiseaseLogDto from '../../validators/medicalIncidents/diseaseLog.dto';
import createNewDto from '../../validators/createNew.dto';
import diseasesModel from '../../models/diseases/diseases.model';
import symptomsModel from '../../models/symptoms/symptoms.model';
import userModel from '../../models/users/user.models';
import causesOfDiseaseModel from '../../models/causes/causesOfDisease.models'
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import fieldstInterface from '../../interfaces/fieldsForForm/fields.interface';
import diseaseInterface from '../../interfaces/diseases/disease.interface';
import diseaseLogInterface from '../../interfaces/diseases/diseaseLog.interface';
import authMiddleware from '../../middleware/auth.middleware';
import diseaseLogModel from '../../models/diseases/diseaseLog.model';
import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import createNew from '../../utils/createNew';
import UpdateDataWCode from '../../utils/updateData';

class DiseaseController{
  public path = '/disease';
  public router = express.Router();
  private disease = diseasesModel;
  private diseaseLog = diseaseLogModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/registerDisease`, authMiddleware, validationMiddleware(CreateDiseaseDto),this.createDisease);
    this.router.get(`${this.path}/getAllDiseases`, this.getAllDiseases);
    this.router.get(`${this.path}/getDisease/:id`, this.getDisease);
    this.router.post(`${this.path}/updateDisease`, authMiddleware, this.updateDisease);
    this.router.post(`${this.path}/createSymptom`, authMiddleware, validationMiddleware(createNewDto),this.createSymptom);
    this.router.post(`${this.path}/createCause`, authMiddleware, validationMiddleware(createNewDto), this.createCause);
    this.router.post(`${this.path}/createDiseaseLog`, authMiddleware, validationMiddleware(CreateDiseaseLogDto),this.createDiseaseLog);
  }


  private createDisease = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) =>{
    const diseaseData: diseaseInterface = req.body;
    createNew(req, res, diseasesModel, diseaseData, next)
  }

  private createSymptom = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) =>{
    const symptomData: fieldstInterface = req.body;
    createNew(req, res, symptomsModel, symptomData, next);
  }

  private createCause = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) =>{
    const causeData: fieldstInterface = req.body;
    createNew(req, res, causesOfDiseaseModel, causeData, next);
  }

  private createDiseaseLog = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const DiseaseLogData : diseaseLogInterface = req.body;
    const user = await this.user.findOne({_id: req.user._id});
    const userInfo = await user.populate('createdBy', '-password');

    if(userInfo.role === 'ADMIN'){
      const createdLog = new this.diseaseLog({
        ...DiseaseLogData,
        athlete: req.body.athlete,
        createdBy: req.user._id,
        createdAt: Date.now()
      });
      await createdLog.populate('athlete', '-password');
      await createdLog.populate('sport', 'name');
      await createdLog.populate('event', 'name');
      await createdLog.populate('afectedSystem', 'name');
      await createdLog.populate('mainSymptoms', 'name');
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

  private updateDisease = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const diseaseData : CreateDiseaseDto = req.body;
    UpdateDataWCode(req, res, diseasesModel, diseaseData, next)
  }

  private getAllDiseases(req: express.Request, res: express.Response){
    diseasesModel.find().then(diseases => {
        res.send(diseases)
      })
  }

  private getDisease = (req: express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    diseasesModel.findById(id).then(disease => {
      if(disease){
        res.send(disease)}
        else{
          res.send("Not found");
        }
    })
  }
}

export default DiseaseController
