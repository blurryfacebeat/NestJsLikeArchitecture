import { UserEntity } from './entity/user.entity.js';
import { UserLoginDto } from './dto/UserLogin.dto.js';
import { UserRegisterDto } from './dto/UserRegister.dto.js';

export interface IUsersService {
  createUser: (userRegisterObject: UserRegisterDto) => Promise<UserEntity | null>;
  validateUser: (userLoginObject: UserLoginDto) => Promise<boolean>;
}
