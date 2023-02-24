import * as mongoose from "mongoose"
import diseaseLogInterface from "../../interfaces/diseases/diseaseLog.interface"

const diseaseLogschema = new mongoose.Schema({
  athlete: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  sport: {
    ref: 'Sports',
    type: mongoose.Schema.Types.ObjectId,
  },
  event: {
    ref: 'Events',
    type: mongoose.Schema.Types.ObjectId,
  },
  diagnostic: String,
  afectedSystem: {
    ref: 'Diseases',
    type: mongoose.Schema.Types.ObjectId,
  },
  mainSymptoms: {
    ref: 'Symptoms',
    type: mongoose.Schema.Types.ObjectId,
  },
  cause: {
    ref: 'Causes',
    type: mongoose.Schema.Types.ObjectId,
  },
  mainTreatment: {
    ref: 'Treatments',
    type: mongoose.Schema.Types.ObjectId,
  },
  reference: {
    ref: 'References',
    type: mongoose.Schema.Types.ObjectId,
  },
  absenceTime: {
    ref: 'Evaluations',
    type: mongoose.Schema.Types.ObjectId,
  },
  recomendations: {
    ref: 'Recomendations',
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: Date,
  createdBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  updatedBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
})

const diseaseLogModel = mongoose.model<diseaseLogInterface & mongoose.Document>('DiseasesLog', diseaseLogschema);

export default diseaseLogModel;
