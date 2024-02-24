import { useEffect, useState } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IApiToken, ILoginCredentials, IRegisterCredentials } from '@/app/types'

const API_URL = 'https://api.petdonor.ru/back/api/v1/';

/* api для запросов, типы и какие объекты будут приходить с бекенда нужно описать после обсуждения контракта */

export interface City {
  id: number;
  city: string;
}

export interface District {
  id: number;
  district: string;
}

export interface PetType {
  id: number;
  type: string;
}

export interface BloodType {
  id: number;
  bloodType: string;
}

export interface DonorRequest {
  description: string;
  vetAddress: string;
  petTypeID: number;
  bloodTypeID: number;
  bloodAmountMl: number;
  availableUntil: string;
}

export interface IUser {
  id: number,
  login: string,
  email: string,
  phone: string,
  surname: string,
  name: string,
  middleName: string,
  created: string,
  lastActive: string,
  location: {
    id: number,
    city: string,
    district: string
  },
  avatar: string,
  vkUserName: string,
  tgUserName: string,
  vkUserId: string,
  emailVisibility: boolean,
  phoneVisibility: boolean
}

export interface IUpdateUser {
  phone: string;
  surname: string;
  name: string;
  lastName: string;
  locationId: number,
  vkUserName: string,
  tgUserName: string,
  emailVisibility: boolean,
  phoneVisibility: boolean
}

export interface IPet{
  petTypeId: number,
  bloodTypeId: number,
  name: string,
  birthday: string,
  weight: number, 
}

export interface GetDonorRequest {
   me: boolean
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
    getCities: builder.query<City[], void>({
      query: () => `location/cities`,
    }),
    getDistricts: builder.query<District[], string>({
      query: (city) => ({
        url: `location/districts`,
        params: { city }
      })
    }),
    getPetTypes: builder.query<PetType[], void>({
      query: () => `pets/types`,
    }),
    getBloodTypes: builder.query<BloodType[], string>({
      query: (petType) => ({
        url: `pets/blood_types`,
        params: { typeName: petType }
      })
    }),
    getDonorRequests: builder.query<object[], GetDonorRequest>({
      query: (params) => ({
        url: `donor_requests/`,
        params
      })
    }),
    addDonorRequest: builder.mutation<void, DonorRequest>({
      query: (body) => ({
        url: `donor_requests/`,
        method: 'POST',
        body,
      })
    }),
    getUserInfo: builder.query<IUser, string>({
      query: (login) => ({
        url: `users/`,
        params: { login }
      })
    }),
    updateUserInfo: builder.mutation<void, Partial<IUpdateUser>>({
        query: (body) => ({
          url: `users/`,
          method: 'PATCH',
          body,
        }),
      }),
    addPet: builder.mutation<void, IPet>({
      query: (body) => ({
        url: `users/`,
        method: 'POST',
        body,
      }),
    }),
  }),
  })

export const {
  useGetCitiesQuery, useGetDistrictsQuery, useGetPetTypesQuery, useGetBloodTypesQuery,
  useAddDonorRequestMutation, useGetDonorRequestsQuery,
  useUpdateUserInfoMutation, useGetUserInfoQuery, useAddPetMutation
} = api

async function postData(url: string, data: object): Promise<object> {
  let headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  let accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  const response = await fetch(API_URL + url, {
    headers,
    method: "POST",
    body: JSON.stringify(data)
  });
  try {
  const body = await response.json();
  if (!response.ok)
    throw body.error;
  return body;
  } catch (e) {
    if (e instanceof SyntaxError) {
      return {}
    }
    throw e;
  }
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

export function getLogin(): string | undefined {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isClient, setIsClient] = useState(false)
// eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsClient(true)
  }, [])

  let isSigned = false;
  let login = ""
  if (isClient && typeof localStorage !== 'undefined' && localStorage.getItem("accessToken") ) {
    return localStorage.getItem("login") || "";
  }
}
