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

export const consultarProfessores = (token: string) => (dispatch : AppDispatch) => {
    axios.get(BACKEND_URL + '/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch(setListaProfessor(response.data));
        })
}

export const postCriarProfessor = (professor : ProfessorType, token: string) => (dispatch : AppDispatch) => {
    axios.post(BACKEND_URL + '/criar', professor, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(_reponse => {
            dispatch(consultarProfessores(token));
            dispatch(limparProfessor());
        }
    )
}

export const putAtualizarProfessor = (id: number, professor: ProfessorType, token: string) => (dispatch: AppDispatch) => {
    axios.put(BACKEND_URL + `/atualizar/${id}`, professor, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(_response => {
            dispatch(consultarProfessores(token));
            dispatch(limparProfessor());
            dispatch(setAcao(null));
        })
}

export const deleteProfessor = (id: number, token: string) => (dispatch: AppDispatch) => {
    axios.delete(BACKEND_URL + `/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(_response => {
            dispatch(consultarProfessores(token));
        })
}

export const getProfessor = (state: RootState) => state.professorSlice.professor;
export const getListaProfessores = (state: RootState) => state.professorSlice.listaProfessores;
export const getAcao = (state: RootState) => state.professorSlice.acao;

export default slice.reducer;