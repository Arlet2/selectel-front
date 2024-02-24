import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IApiToken, ILoginCredentials, IRegisterCredentials } from '@/app/types'

const API_URL = 'https://api.petdonor.ru/back/api/v1/';

/* api для запросов, типы и какие объекты будут приходить с бекенда нужно описать после обсуждения контракта */

interface ISomeType {
    id: number;
    name: string;
}

interface District {
  id: number;
  district: string;
}

interface BloodType {
  id: number;
  bloodType: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      let accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    /* в дженерике первым аргументом передается тип, который мы получаем, вторым аргументом - тип, который передается в кверю*/
    getCities: builder.query<string[], void>({
      query: () => `location/cities`,
    }),
    getDistricts: builder.query<District[], string>({
      query: (city) => ({
        url: `location/districts`,
        params: { city }
      })
    }),
    getPetTypes: builder.query<string[], void>({
      query: () => `pets/types`,
    }),
    getBloodTypes: builder.query<BloodType[], string>({
      query: (petType) => ({
        url: `pets/blood_types`,
        params: { typeName: petType }
      })
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

/* хуки, которые потом используем в компонентах, генерируются автоматически */
export const { useGetCitiesQuery, useGetDistrictsQuery, useGetPetTypesQuery, useGetBloodTypesQuery } = api

async function postData(url: string, data: object): Promise<object> {
  let headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  let accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers['authorization'] = `Bearer ${accessToken}`
  }
  const response = await fetch(API_URL + url, {
    headers,
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

export async function logout(): Promise<void> {
  await postData("auth/logout", {}) as IApiToken;
}
