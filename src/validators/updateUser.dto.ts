import { IsString, IsBoolean } from 'class-validator';

class UpdateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public username: string;

  @IsString()
  public email: string;

  @IsString()
  public job: string;

  @IsBoolean()
  public active: Boolean;

  @IsString()
  public role: string;
}

export default UpdateUserDto;
