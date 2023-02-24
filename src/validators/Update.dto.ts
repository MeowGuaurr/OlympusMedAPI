import { IsString, IsInt, IsBoolean } from 'class-validator';

class UpdateDto {
  @IsString()
  public name: String;

  @IsInt()
  public code: Number;

  @IsBoolean()
  public active: Boolean;
}

export default UpdateDto;
