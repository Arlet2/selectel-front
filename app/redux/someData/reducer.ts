import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SomeState {
    id: number;
    timestamp: string;
}

/* срез стора для определенного объекта, где мы храним какую-то определенную информацию, здесь можно прописать сетеры и изначальное значение в сторе*/
export const someSlice = createSlice({
    name: 'someSlice',
    initialState: {
        id: 0,
        timestamp: "2024-05-05",
    } as SomeState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setTimestamp: (state, action: PayloadAction<string>) => {
            state.timestamp = action.payload;
        },
    }
});

export const { setId, setTimestamp } = someSlice.actions;