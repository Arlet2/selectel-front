import { exampleApi } from '@/app/redux/services/api';
import { configureStore } from '@reduxjs/toolkit';

import { someSlice } from '@redux/someData/reducer';
import { logger } from '@redux/middlewares/logger';

/* стор - хранилище данных */
export const store = configureStore({
    reducer: {
        /* здесь хранятся редьюсеры, чтобы брать информацию из стора */
        [exampleApi.reducerPath]: exampleApi.reducer,
        something: someSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([exampleApi.middleware, logger]),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
