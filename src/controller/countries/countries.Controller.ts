import * as express from 'express';
import countriesModel from '../../models/countries/countries.model';
import userModel from '../../models/users/user.models';
import createCountryDto from '../../validators/createCountry.dto';
import authMiddleware from '../../middleware/auth.middleware';
import validationMiddleware from '../../validators/middleware.validator';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import countriesInterface from '../../interfaces/countries/countries.interface';
import UpdateDto from 'v../../validators/Update.dto';

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
    this.router.post(`${this.path}/updateCountry`, authMiddleware, this.updateCountry);
  }

  public createCountry = async (req: RequestWithUser, res: express.Response) => {
    const countryData: countriesInterface = req.body;
    const createdCountry = new this.country({
      ...countryData,
      createdBy: req.user._id,
      createdAt: Date.now(),
      active: true
    });

    const savedCountry = await createdCountry.save();
    await savedCountry.populate('createdBy', '-password');
    res.send(createdCountry);
  }

  public getAllCountries(req: express.Request, res: express.Response){
    this.country.find().then(countries => {
      res.send(countries);
    })
  }

  public updateCountry= async (req: RequestWithUser, res: express.Response) => {
    const countryData: UpdateDto = req.body;
    console.log(countryData)

    const user = await this.user.findOne({_id: req.user._id});
    const userInfo = await user.populate('email','-password');
    if(userInfo.role === 'ADMIN'){
      const doc = await this.country.findOne({code: countryData.code})

      const update = {name: countryData.name, active: countryData.active, updatedAt: Date.now(), updatedBy: req.user._id}
      await doc.updateOne(update);

      const updatedCountry = await this.country.findOne({code: countryData.code});
      updatedCountry.update;
      res.send("country updated")
    }
    else{
      res.send("NOT ALLOWED");
    }

  }


}

export default CountryController
