import * as mongoose from "mongoose"
import injuryLogInterface from "../../interfaces/injuries/injuryLog.interface"

const injuryLogSchema = new mongoose.Schema({
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
  activity: {
    ref: 'Activities',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  regionOfBodyAffected : {
    ref: 'RegionsOfBody',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  diagnostic : {
    ref: 'Injuries',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  cause: {
    ref: 'CausesofInjury',
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
});

const injuryLogModel = mongoose.model<injuryLogInterface & mongoose.Document>('InjuriesLog', injuryLogSchema);

export default injuryLogModel;
