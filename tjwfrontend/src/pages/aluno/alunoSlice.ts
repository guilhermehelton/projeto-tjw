import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";

export type AlunoType = {
    id?: number,
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    dataNascimento: string
}

const BACKEND_URL = 'http://localhost:9001/aluno';

const slice = createSlice({
    name: 'aluno',
    initialState: {
        listaAlunos: [] as AlunoType[],
        aluno: {
            nome: '',
            email: '',
            cpf: '',
            telefone: '',
            dataNascimento: '',
        } as AlunoType,
    },
    reducers: {
        setAluno: (state, action) => {
            state.aluno = {...action.payload };
        },
        setListaAlunos: (state, action) => {
            state.listaAlunos = [...action.payload];
        },
        setCampoAluno: (state, action) => {
            const { id, value } = action.payload as { id : keyof AlunoType, value : AlunoType[keyof AlunoType]};
            if(id != "id") {
                state.aluno[id] = value as string;
            }
            return
        },
        limparAluno: (state) => {
            state.aluno = {} as AlunoType;
        }
    }
})

export const { setAluno, setListaAlunos, setCampoAluno, limparAluno } = slice.actions;

export const consultarAlunos = () => (dispatch : AppDispatch) => {
    axios.get(BACKEND_URL + '/')
        .then(response => {
            dispatch(setListaAlunos(response.data));
        })
}

export const postCriarAluno = (aluno : AlunoType) => (dispatch : AppDispatch) => {
    axios.post(BACKEND_URL + '/criar', aluno)
        .then(_reponse => {
            dispatch(consultarAlunos());
            dispatch(limparAluno());
        }
    )
}

export const getAluno = (state: RootState) => state.alunoSlice.aluno;
export const getListaAlunos = (state: RootState) => state.alunoSlice.listaAlunos;

export default slice.reducer;