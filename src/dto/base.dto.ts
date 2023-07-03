// base dto class for all dto classes in this project that need to be format
// like : data is base64, hash is string

import { IsBase64, IsString } from 'class-validator';

export class BaseDto {
  @IsBase64()
  data: string;

  @IsString()
  hash: string;
}
