import * as express from 'express';
import eventsModel from '../../models/events/events.model';
import userModel from '../../models/users/user.models';
import authMiddleware from '../../middleware/auth.middleware';
import validationMiddleware from '../../validators/middleware.validator';
import createCountryDto from '../../validators/createCountry.dto';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import FieldstInterface from '../../interfaces/fieldsForForm/fields.interface';
import UpdateDto from '../../validators/Update.dto';
import createNew from '../../utils/createNew';
import UpdateDataWCode from '../../utils/updateData';

class EventsController{
  public path = '/events';
  public router = express.Router();
  private event = eventsModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.post(`${this.path}/registerEvent`, authMiddleware, validationMiddleware(createCountryDto),this.createEvent);
    this.router.get(`${this.path}/getAllEvents`, this.getAllEvents);
    this.router.get(`${this.path}/getEvent/:id`, this.getEvent);
    this.router.post(`${this.path}/updateEvent`, authMiddleware, this.updateEvent);
  }

  public createEvent = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const eventData: FieldstInterface = req.body;
    createNew(req, res, eventsModel, eventData, next)
  }

  public getAllEvents = (req: express.Request, res: express.Response) => {
    this.event.find().then(events => {
      res.send(events);
    })
  }

  private getEvent = (req: express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    this.event.findById(id).then(event => {
      if(event){
        res.send(event)}
        else{
          res.send("Not found");
        }
    })
  }

  public updateEvent= async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const eventData: UpdateDto = req.body;
    UpdateDataWCode(req, res, eventsModel, eventData, next)
  }


}

export default EventsController
