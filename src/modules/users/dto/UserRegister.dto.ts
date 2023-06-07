import { IsEmail, IsString } from 'class-validator';

import {
  CODE_FIELD_REQUIRED,
  INVALID_EMAIL_FORMAT,
  NAME_FIELD_REQUIRED,
  PASSWORD_FIELD_REQUIRED,
} from '../exceptions/messages.js';

export class UserRegisterDto {
  @IsEmail({}, { message: INVALID_EMAIL_FORMAT })
  email: string;

  @IsString({ message: PASSWORD_FIELD_REQUIRED })
  password: string;

  @IsString({ message: NAME_FIELD_REQUIRED })
  name: string;

  @IsString({ message: CODE_FIELD_REQUIRED })
  code: string;
}
