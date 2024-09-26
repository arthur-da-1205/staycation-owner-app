export interface AuthRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthLoginInput {
  email: string;
  password: string;
}
