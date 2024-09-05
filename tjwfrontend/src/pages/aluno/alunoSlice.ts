import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'aluno',
    initialState: {
        listaAlunos: [],
        aluno: {},
    },
    reducers: {
        cadastrarAluno: (state, action) => {
        }
    }
})

export const { cadastrarAluno } = slice.actions;
export default slice.reducer;