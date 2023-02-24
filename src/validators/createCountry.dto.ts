import { IsString, IsInt } from 'class-validator';

class createCountryDto {
  @IsString()
  public name: String;

  @IsInt()
  public code: Number;
}

export default createCountryDto;
