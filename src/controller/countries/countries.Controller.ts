import * as express from 'express';
import countriesModel from '../../models/countries/countries.model';
import userModel from '../../models/users/user.models';
import createCountryDto from '../../validators/createCountry.dto';
import authMiddleware from '../../middleware/auth.middleware';
import validationMiddleware from '../../validators/middleware.validator';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import countriesInterface from '../../interfaces/countries/countries.interface';
import UpdateDto from '../../validators/Update.dto';
import createNew from '../../utils/createNew';
import UpdateDataWCode from '../../utils/updateData';

class CountryController{
  public path = '/country';
  public router = express.Router();
  private country = countriesModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/registerCountry`, authMiddleware, validationMiddleware(createCountryDto),this.createCountry);
    this.router.get(`${this.path}/getAllCountries`, this.getAllCountries);
    this.router.get(`${this.path}/getCountry/:id`, this.getCountry);
    this.router.post(`${this.path}/updateCountry`, authMiddleware, this.updateCountry);
  }

  public createCountry = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const countryData: countriesInterface = req.body;
    createNew(req, res, countriesModel, countryData, next)
  }

  public getAllCountries = (req: express.Request, res: express.Response) => {
    this.country.find().then(countries => {
      res.send(countries);
    })
  }

  private getCountry = (req: express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    countriesModel.findById(id).then(country => {
      if(country){
        res.send(country)}
        else{
          res.send("Not found");
        }
    })
  }

  public updateCountry= async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const countryData: UpdateDto = req.body;
    UpdateDataWCode(req, res, countriesModel, countryData, next)
  }


}

export default CountryController
