import { IsString } from 'class-validator';

class CreateDiseaseLogDto {
  @IsString()
  public athlete: String;

  @IsString()
  public sport: String;

  @IsString()
  public event: String;

  @IsString()
  public afectedSystem: String;

  @IsString()
  public recomendations: String;
}

export default CreateDiseaseLogDto;
