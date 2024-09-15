import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";
import { convertDateFormat } from "../utils/FormatData";

export type AlunoType = {
    id?: number,
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    dataNascimento: string
}

const BACKEND_URL = 'http://localhost:9001/aluno';

export const ACAO_CADASTRAR = 'CADASTRAR_ALUNO';
export const ACAO_ATUALIZAR = 'ATUALIZAR_ALUNO';

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
        acao: null
    },
    reducers: {
        setAluno: (state, action) => {
            state.aluno = {...action.payload };
            state.aluno.dataNascimento = convertDateFormat(action.payload.dataNascimento);
        },
        setListaAlunos: (state, action) => {
            state.listaAlunos = action.payload.map((elemento : AlunoType) => {
                return {
                    ...elemento,
                    dataNascimento: convertDateFormat(elemento.dataNascimento),
                }
            });
        },
        setCampoAluno: (state, action) => {
            const { id, value } = action.payload as { id : keyof AlunoType, value : AlunoType[keyof AlunoType]};
            if(id != "id") {
                state.aluno[id] = value as string;
                if(id == "dataNascimento") {
                    state.aluno[id] = convertDateFormat(value as string);
                }
            }
            return
        },
        limparAluno: (state) => {
            state.aluno = {} as AlunoType;
        },
        setAcao: (state, action) => {
            state.acao = action.payload;
        }
    }
})

export const { setAluno, setListaAlunos, setCampoAluno, limparAluno, setAcao } = slice.actions;

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

export const putAtualizarAluno = (id: number, aluno: AlunoType) => (dispatch: AppDispatch) => {
    axios.put(BACKEND_URL + `/atualizar/${id}`, aluno)
        .then(_response => {
            dispatch(consultarAlunos());
            dispatch(limparAluno());
            dispatch(setAcao(null));
        })
}

export const deleteAluno = (id: number) => (dispatch: AppDispatch) => {
    axios.delete(BACKEND_URL + `/${id}`)
        .then(_response => {
            dispatch(consultarAlunos());
        })
}

export const getAluno = (state: RootState) => state.alunoSlice.aluno;
export const getListaAlunos = (state: RootState) => state.alunoSlice.listaAlunos;
export const getAcao = (state: RootState) => state.alunoSlice.acao;

export default slice.reducer;