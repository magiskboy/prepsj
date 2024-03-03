export interface IGoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
  locale: string;
}

export interface IJwtPayload {
  sub: string;
  email: string;
  fullname: string;
}
