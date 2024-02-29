import * as express from "express";
import userModel from "../../models/users/user.models";
import treatmentsModel from "../../models/treatments/treatments.models";
import referencesModel from "../../models/references/references.model";
import recomendationsModel from "../../models/recomendations/recomendations.models";
import sportModel from "../../models/sports/sports.model";
import RequestWithUser from "interfaces/requestWithUser.interface";
import authMiddleware from "../../middleware/auth.middleware";
import createNewDto from "../../validators/createNew.dto";
import UpdateDto from "../../validators/Update.dto";
import createNew from "../../utils/createNew";
import UpdateDataWCode from "../../utils/updateData";

class CommonDataController{
  public path = '/common';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/registerTreatment`, authMiddleware,this.createTreatment);
    this.router.post(`${this.path}/registerReference`, authMiddleware,this.createReference);
    this.router.post(`${this.path}/registerRecomendation`, authMiddleware,this.createRecomendation);
    this.router.post(`${this.path}/updateTreatment`, authMiddleware,this.updateTreatment);
    this.router.post(`${this.path}/updateReference`, authMiddleware,this.updateReference);
    this.router.post(`${this.path}/updateRecomendation`, authMiddleware,this.updateRecomendation);
    this.router.get(`${this.path}/getAllTreatments`, this.getAllTreatments);
    this.router.get(`${this.path}/getAllReferences`, this.getAllReferences);
    this.router.get(`${this.path}/getAllRecomendations`, this.getAllRecomendations);
    this.router.get(`${this.path}/getTreatment/:id`, this.getTreatment);
    this.router.get(`${this.path}/getReference/:id`, this.getReference);
    this.router.get(`${this.path}/getRecomendation/:id`, this.getRecomendation);
    this.router.post(`${this.path}/createSport`, authMiddleware,this.createSport);
  }

    private createTreatment = async(req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      const treatmentData: createNewDto = req.body;
      createNew(req, res, treatmentsModel, treatmentData, next)
    }

    private createReference = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      const referenceData : createNewDto = req.body;
      createNew(req, res, referencesModel, referenceData, next);
    }

    private createRecomendation = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      const recomendationData : createNewDto = req.body;
      createNew(req, res, recomendationsModel, recomendationData, next)
    }

    private createSport = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      const  sportData : createNewDto = req.body;
      createNew(req, res, sportModel, sportData, next)
    }

    private updateTreatment = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const treatmentData: UpdateDto = req.body;
        UpdateDataWCode(req, res, treatmentsModel, treatmentData, next)

    }

    private updateReference = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      const referenceData: UpdateDto = req.body;
      UpdateDataWCode(req, res, referencesModel, referenceData, next)
    }

    private updateRecomendation = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
      const recomendationData: UpdateDto = req.body;
      UpdateDataWCode(req, res, recomendationsModel, recomendationData, next)
    }

    private getAllTreatments = (req: express.Request, res: express.Response) => {
      treatmentsModel.find().then(treatments => {
        res.send(treatments);
      })
    }

    private getAllReferences = (req: express.Request, res: express.Response) => {
      referencesModel.find().then(references => {
        res.send(references);
      })
    }

    private getAllRecomendations = (req: express.Request, res: express.Response) => {
      recomendationsModel.find().then(recomendations => {
        res.send(recomendations);
      })
    }

    private getTreatment = (req: express.Request, res:express.Response, next: express.NextFunction) => {
      const id = req.params.id;
      treatmentsModel.findById(id).then(treatment => {
        if(treatment){
          res.send(treatment)}
          else{
            res.send("Not found");
          }
      })
    }

    private getReference = (req: express.Request, res:express.Response, next: express.NextFunction) => {
      const id = req.params.id;
      referencesModel.findById(id).then(reference => {
        if(reference){
          res.send(reference)}
          else{
            res.send("Not found");
          }
      })
    }

    private getRecomendation = (req: express.Request, res:express.Response, next: express.NextFunction) => {
      const id = req.params.id;
      recomendationsModel.findById(id).then(recomendation => {
        if(recomendation){
          res.send(recomendation)}
          else{
            res.send("Not found");
          }
      })
    }
}


export default CommonDataController
