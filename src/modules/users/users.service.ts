import { injectable } from 'inversify';

import { UserEntity } from './entity/user.entity.js';
import { UserLoginDto } from './dto/UserLogin.dto.js';
import { IUsersService } from './users.service.types.js';
import { UserRegisterDto } from './dto/UserRegister.dto.js';

@injectable()
export class UsersService implements IUsersService {
  async createUser({ email, code, name, password }: UserRegisterDto) {
    const newUser = new UserEntity(email, name, code);

    await newUser.setPassword(password);

    return newUser;
  }

  async validateUser(userLoginObject: UserLoginDto) {
    return true;
  }
}
