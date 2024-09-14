import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";

export type ProfessorType = {
    id?: number,
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    dataNascimento: string
}

const BACKEND_URL = 'http://localhost:9001/professor';

export const ACAO_CADASTRAR = 'CADASTRAR_PROFESSOR';
export const ACAO_ATUALIZAR = 'ATUALIZAR_PROFESSOR';

const slice = createSlice({
    name: 'professor',
    initialState: {
        listaProfessores: [] as ProfessorType[],
        professor: {
            nome: '',
            email: '',
            cpf: '',
            telefone: '',
            dataNascimento: '',
        } as ProfessorType,
        acao: null
    },
    reducers: {
        setProfessor: (state, action) => {
            state.professor = {...action.payload };
        },
        setListaProfessor: (state, action) => {
            state.listaProfessores = [...action.payload];
        },
        setCampoProfessor: (state, action) => {
            const { id, value } = action.payload as { id : keyof ProfessorType, value : ProfessorType[keyof ProfessorType]};
            if(id != "id") {
                state.professor[id] = value as string;
            }
            return
        },
        limparProfessor: (state) => {
            state.professor = {} as ProfessorType;
        },
        setAcao: (state, action) => {
            state.acao = action.payload;
        }
    }
})

export const { setProfessor, setListaProfessor, setCampoProfessor, limparProfessor, setAcao } = slice.actions;

export const consultarProfessores = () => (dispatch : AppDispatch) => {
    axios.get(BACKEND_URL + '/')
        .then(response => {
            dispatch(setListaProfessor(response.data));
        })
}

export const postCriarProfessor = (professor : ProfessorType) => (dispatch : AppDispatch) => {
    axios.post(BACKEND_URL + '/criar', professor)
        .then(_reponse => {
            dispatch(consultarProfessores());
            dispatch(limparProfessor());
        }
    )
}

export const putAtualizarProfessor = (id: number, professor: ProfessorType) => (dispatch: AppDispatch) => {
    axios.put(BACKEND_URL + `/atualizar/${id}`, professor)
        .then(_response => {
            dispatch(consultarProfessores());
            dispatch(limparProfessor());
            dispatch(setAcao(null));
        })
}

export const deleteProfessor = (id: number) => (dispatch: AppDispatch) => {
    axios.delete(BACKEND_URL + `/${id}`)
        .then(_response => {
            dispatch(consultarProfessores());
        })
}

export const getProfessor = (state: RootState) => state.professorSlice.professor;
export const getListaProfessores = (state: RootState) => state.professorSlice.listaProfessores;
export const getAcao = (state: RootState) => state.professorSlice.acao;

export default slice.reducer;