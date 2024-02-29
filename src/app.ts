import * as express from 'express'
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware';
const morgan = require('morgan')
const cors = require('cors')

class App{
  public app: express.Application;

  constructor(controllers, port) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();

  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(morgan('combined'));
    this.app.use(cors());
  }

  private initializeControllers(controllers)
  {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private connectToTheDatabase() {
    const{
      MONGO_URI
    } = process.env;
    mongoose.connect(MONGO_URI)
    .then(()=> console.log('connected to MongoDB'))
    .catch((err) => console.log('error connecting to MongoDB', err));
  }
}

export default App;
