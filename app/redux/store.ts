import { api } from '@/app/redux/services/api';
import { configureStore } from '@reduxjs/toolkit';

import { logger } from '@redux/middlewares/logger';

/* стор - хранилище данных */
export const store = configureStore({
    reducer: {
        /* здесь хранятся редьюсеры, чтобы брать информацию из стора */
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([api.middleware, logger]),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
