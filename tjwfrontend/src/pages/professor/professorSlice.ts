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
        }
    }
})

export const { setProfessor, setListaProfessor, setCampoProfessor, limparProfessor } = slice.actions;

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

export const getProfessor = (state: RootState) => state.professorSlice.professor;
export const getListaProfessores = (state: RootState) => state.professorSlice.listaProfessores;

export default slice.reducer;