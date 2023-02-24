import { IsString, IsBoolean } from 'class-validator';

class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public email: string;

  @IsString()
  public job: string;

  @IsBoolean()
  public active: Boolean;
}

export default CreateUserDto;
