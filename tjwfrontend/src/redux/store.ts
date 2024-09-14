import { configureStore } from "@reduxjs/toolkit";
import alunoSlice from "../pages/aluno/alunoSlice";
import professorSlice from "../pages/professor/professorSlice";
import disciplinaSlice from "../pages/disciplina/disciplinaSlice";
import turmaSlice from "../pages/turma/turmaSlice";

export const store = configureStore({
    reducer: {
        alunoSlice: alunoSlice,
        professorSlice: professorSlice,
        disciplinaSlice: disciplinaSlice,
        turmaSlice: turmaSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;