import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  IsEnum,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';
export class RegisterDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'Supported values:  Male, Female or Other',
  })
  gender: Gender;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
    {
      message:
        'password should contains at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ]',
    },
  )
  password: string;
}
