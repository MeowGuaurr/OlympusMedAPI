import * as mongoose from "mongoose"
import DiseaseLogInterface from "../../interfaces/diseases/diseaseLog.interface"

const diseaseLogschema = new mongoose.Schema({
  athlete: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sport: {
    ref: 'Sports',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  event: {
    ref: 'Events',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  diagnostic: String,
  afectedSystem: {
    ref: 'Diseases',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  mainSymptoms: {
    ref: 'Symptoms',
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
  },
  cause: {
    ref: 'CausesOfDisease',
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
  },
  mainTreatment: {
    ref: 'Treatments',
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
  },
  reference: {
    ref: 'References',
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
  },
  absenceTime: String,
  recomendations: {
    ref: 'Recomendations',
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
  },
  createdAt: Date,
  createdBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
  },
  updatedBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
  },
})

const diseaseLogModel = mongoose.model<DiseaseLogInterface & mongoose.Document>('DiseasesLog', diseaseLogschema);

export default diseaseLogModel;
