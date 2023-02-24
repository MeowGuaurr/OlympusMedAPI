import { IsString, IsInt } from 'class-validator';

class CreateInjuriesDto {
  @IsString()
  public name: String;

  @IsInt()
  public code: Number;
}

export default CreateInjuriesDto;
