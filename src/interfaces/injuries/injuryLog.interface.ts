interface InjuryLogInterface{
  _id: string;
  athlete: string;
  athleteId: string;
  country: string;
  sport: string;
  event: string;
  activity: string;
  regionOfBodyAffected: string;
  diagnostic: string;
  cause: string;
  mainTreatment: string;
  reference: string;
  absenceTime: string;
  recomendations: string;
  createdAt: Date;
  createdBy: string;
  updatedBy: string;
}

export default InjuryLogInterface;
