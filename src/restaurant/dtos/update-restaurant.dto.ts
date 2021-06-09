import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PUBLIC } from '../enums/public-enum';

export class UpdateRestaurantDTO {
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  zipCode: string;

  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PUBLIC, { message: 'Accepted values yes or no' })
  isPublic: PUBLIC;
}
