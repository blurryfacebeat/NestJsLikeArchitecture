export class UserRegisterResultDto {
  email: string;
  name: string;
  code: string;

  constructor({ email, name, code }: { email: string; name: string; code: string }) {
    this.email = email;
    this.name = name;
    this.code = code;
  }
}
