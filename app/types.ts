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
  login?: string;
  accessToken: string;
  refreshToken: string;
}
