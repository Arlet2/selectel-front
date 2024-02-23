import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IApiToken, ILoginCredentials, IRegisterCredentials } from '@/app/types'

const API_URL = 'https://api.petdonor.ru/back/api/v1/';

/* api для запросов, типы и какие объекты будут приходить с бекенда нужно описать после обсуждения контракта */

interface ISomeType {
    id: number;
    name: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      let authToken = localStorage.getItem("authToken");

      if (authToken) {
        headers.set('authorization', `Bearer ${authToken}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    /* в дженерике первым аргументом передается тип, который мы получаем, вторым аргументом - тип, который передается в кверю*/
    getSomethingByName: builder.query<string, string>({
      query: (name) => `something/${name}`,
    }),
    addSomething: builder.mutation<ISomeType, Partial<ISomeType>>({
        query: (body) => ({
          url: `something/create`,
          method: 'POST',
          body,
        }),
      }),
  }),
})

async function postData(url: string, data: object): Promise<object> {
  const response = await fetch(API_URL + url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  });
  const body = await response.json();
  if (!response.ok)
    throw body.error;
  return body;
}

export async function register(credentials: IRegisterCredentials): Promise<IApiToken> {
  return await postData("auth/register", credentials) as IApiToken;
}

export async function login(credentials: ILoginCredentials): Promise<IApiToken> {
  return await postData("auth/login", credentials) as IApiToken;
}

/* хуки, которые потом используем в компонентах, генерируются автоматически */
export const { useGetSomethingByNameQuery } = api
