import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class LoginDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\]\@#?])[A-Za-z\d!@\]\#?]{10,}$/,
    {
      message:
        'password should contains at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ]',
    },
  )
  password: string;
}
