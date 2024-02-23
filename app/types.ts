export interface ILoginCredentials {
  login: string;
  password: string;
}

export interface IRegisterCredentials {
  login: string;
  email: string;
  password: string;
}

export interface IApiToken {
  accessToken: string;
  refreshToken: string;
}
