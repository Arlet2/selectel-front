import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@redux/store';

export const logger: Middleware = (api: MiddlewareAPI<AppDispatch, RootState>) => (next: (action: unknown) => unknown) => (action: unknown): unknown => {
    console.log(action);
    return next(action);
};
