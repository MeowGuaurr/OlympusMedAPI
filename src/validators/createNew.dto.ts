import { IsString} from 'class-validator';

class createNewDto {
  @IsString()
  public name: String;
}

export default createNewDto;
