import { RootState } from '@redux/store';

export const someDataSelector = (state: RootState) => {
    return state.something;
};