import { configureStore } from "@reduxjs/toolkit";
import alunoSlice from "../pages/aluno/alunoSlice";

export const store = configureStore({
    reducer: {
        alunoSlice: alunoSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;