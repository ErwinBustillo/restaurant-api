import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRestaurantDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  zipCode: string;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
}
