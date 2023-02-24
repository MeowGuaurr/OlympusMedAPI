import { IsString, IsInt } from 'class-validator';

class CreateDiseaseDto {
  @IsString()
  public name: String;

  @IsInt()
  public code: Number;
}

export default CreateDiseaseDto;
