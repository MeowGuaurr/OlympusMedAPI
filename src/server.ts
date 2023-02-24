import 'dotenv/config';
import AuthController from './controller/auth.Controller';
import DiseaseController from './controller/diseases/diseases.Controller';
import InjuriesController from './controller/injuries/injuries.Controller';
import CountryController from './controller/countries/countries.Controller';
import validateEnv from './utils/validateEnv';

import App from './app';

validateEnv();

const app = new App(
  [
    new AuthController(),
    new DiseaseController(),
    new InjuriesController(),
    new CountryController()
  ],
  3000,
);

app.listen();
