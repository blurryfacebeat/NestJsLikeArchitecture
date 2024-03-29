import bcrypt from 'bcryptjs';

export class UserEntity {
  private _password: string;

  constructor(private readonly _email: string, private readonly _name: string, private readonly _code: string) {}

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get password() {
    return this._password;
  }

  get code() {
    return this._code;
  }

  async setPassword(password: string) {
    this._password = await bcrypt.hash(password, '$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbh');
  }
}
