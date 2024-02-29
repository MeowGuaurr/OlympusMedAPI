interface DiseaseLogInterface {
  _id: string;
  athlete: string;
  athleteId: string;
  country: string;
  sport: string;
  event: string;
  diagnostic: string;
  afectedSystem: string;
  mainSymptoms: string;
  cause: string;
  mainTreatment: string;
  reference: string;
  absenceTime: string;
  recomendations: string;
  createdAt: Date;
  createdBy: string;
  updatedBy: string;
}

export default DiseaseLogInterface;
