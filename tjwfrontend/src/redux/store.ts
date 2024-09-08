import { configureStore } from "@reduxjs/toolkit";
import alunoSlice from "../pages/aluno/alunoSlice";
import professorSlice from "../pages/professor/professorSlice";

export const store = configureStore({
    reducer: {
        alunoSlice: alunoSlice,
        professorSlice: professorSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;