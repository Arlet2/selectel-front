import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/* api для запросов, типы и какие объекты будут приходить с бекенда нужно описать после обсуждения контракта */

interface ISomeType {
    id: number;
    name: string;
}

export const exampleApi = createApi({
  reducerPath: 'someName',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://something/api' }),
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

/* хуки, которые потом используем в компонентах, генерируются автоматически */
export const { useGetSomethingByNameQuery } = exampleApi