import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { PUBLIC } from '../enums/public-enum';

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
  @IsEnum(PUBLIC, { message: 'Accepted values yes or no' })
  isPublic: PUBLIC;
}
