import * as express from 'express';
import validationMiddleware from '../../validators/middleware.validator';
import CreateDiseaseDto from '../../validators/diseases.dto';
import createNewDto from '../../validators/createNew.dto';
import diseasesModel from '../../models/diseases/diseases.model';
import symptomsModel from '../../models/symptoms/symptoms.model';
import userModel from '../../models/users/user.models';
import causesOfDiseaseModel from '../../models/causes/causesOfDisease.models'
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import fieldstInterface from '../../interfaces/fieldsForForm/fields.interface';
import diseaseInterface from '../../interfaces/diseases/disease.interface';
import authMiddleware from '../../middleware/auth.middleware';



class DiseaseController{
  public path = '/disease';
  public router = express.Router();
  private disease = diseasesModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/registerDisease`, authMiddleware, validationMiddleware(CreateDiseaseDto),this.createDisease);
    this.router.get(`${this.path}/getAllDiseases`, this.getAllDiseases);
    this.router.post(`${this.path}/updateDisease`, authMiddleware, this.updateDisease);
    this.router.post(`${this.path}/createSymptom`, authMiddleware, validationMiddleware(createNewDto),this.createSymptom);
    this.router.post(`${this.path}/createCause`, authMiddleware, validationMiddleware(createNewDto), this.createCause);
  }


private createDisease = async (req: RequestWithUser, res: express.Response) =>{
    const diseaseData: diseaseInterface = req.body;
    const user = await this.user.findOne({_id: req.user._id});
    const userInfo = await user.populate('email','-password');

    if(userInfo.role === 'ADMIN'){
      const createdDisease = new this.disease({
        ...diseaseData,
        active: true,
        createdBy: req.user._id,
      });
      const savedDisease = await createdDisease.save();
      await savedDisease.populate('createdBy', '-password');
      res.send(savedDisease);
    }
    else{
      res.send("NOT ALLOWED");
    }
  }

  private updateDisease = async (req: RequestWithUser, res: express.Response) => {
    const diseaseData : CreateDiseaseDto = req.body;
    const user = await this.user.findOne({_id: req.user._id});
    const userInfo = await user.populate('email','-password');

    if(userInfo.role === 'ADMIN'){
    const disease = this.disease.findOneAndUpdate({code: diseaseData.code}, diseaseData, {new: true})
    .then(ok => {res.send(ok)});
    }
    else{
      res.send("NOT ALLOWED");
    }
  }

  private getAllDiseases(req: express.Request, res: express.Response){
    diseasesModel.find().then(diseases => {
        res.send(diseases)
      })
  }

  private createSymptom = async (req: RequestWithUser, res: express.Response) =>{
    const symptomData: fieldstInterface = req.body;
    console.log("user");
    console.log(req.user);
    const createdSymptom = new symptomsModel({
      ...symptomData,
      createdBy: req.user._id,
      createdAt: Date.now(),
      active: true
    });
    const savedSymptom = await createdSymptom.save();
    await savedSymptom.populate('createdBy', '-password');
    res.send(createdSymptom);
  }

  private createCause = async (req: RequestWithUser, res: express.Response) =>{
    const causeData: fieldstInterface = req.body;
    const createdCause = new causesOfDiseaseModel({
      ...causeData,
      createdBy: req.user._id,
      createdAt: Date.now(),
      active: true
    });
    const savedCause = await createdCause.save();
    await savedCause.populate('createdBy', '-password');
    res.send(createdCause);
  }

}

export default DiseaseController;
