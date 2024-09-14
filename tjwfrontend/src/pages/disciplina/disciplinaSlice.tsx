import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";

export type DisciplinaType = {
    id?: number,
    nome: string,
}

const BACKEND_URL = 'http://localhost:9001/disciplina';

export const ACAO_CADASTRAR = 'CADASTRAR_DISCIPLINA';
export const ACAO_ATUALIZAR = 'ATUALIZAR_DISCIPLINA';

const slice = createSlice({
    name: 'disciplina',
    initialState: {
        listaDisciplina: [] as DisciplinaType[],
        disciplina: {
            nome: '',
        } as DisciplinaType,
        acao: null
    },
    reducers: {
        setDisciplina: (state, action) => {
            state.disciplina = {...action.payload };
        },
        setListaDisciplina: (state, action) => {
            state.listaDisciplina = [...action.payload];
        },
        setCampoDisciplina: (state, action) => {
            const { id, value } = action.payload as { id : keyof DisciplinaType, value : DisciplinaType[keyof DisciplinaType]};
            if(id != "id") {
                state.disciplina[id] = value as string;
            }
            return
        },
        limparDisciplina: (state) => {
            state.disciplina = {} as DisciplinaType;
        },
        setAcao: (state, action) => {
            state.acao = action.payload;
        }
    }
})

export const { setDisciplina, setListaDisciplina, setCampoDisciplina, limparDisciplina, setAcao } = slice.actions;

export const consultarDisciplina = () => (dispatch : AppDispatch) => {
    axios.get(BACKEND_URL + '/')
        .then(response => {
            dispatch(setListaDisciplina(response.data));
        })
}

export const postCriarDisciplina = (disciplina : DisciplinaType) => (dispatch : AppDispatch) => {
    axios.post(BACKEND_URL + '/criar', disciplina)
        .then(_reponse => {
            dispatch(consultarDisciplina());
            dispatch(limparDisciplina());
        }
    )
}

export const putAtualizarDisciplina = (id: number, disciplina: DisciplinaType) => (dispatch: AppDispatch) => {
    axios.put(BACKEND_URL + `/atualizar/${id}`, disciplina)
        .then(_response => {
            dispatch(consultarDisciplina());
            dispatch(limparDisciplina());
            dispatch(setAcao(null));
        })
}

export const deleteDisciplina = (id: number) => (dispatch: AppDispatch) => {
    axios.delete(BACKEND_URL + `/${id}`)
        .then(_response => {
            dispatch(consultarDisciplina());
        })
}

export const getDisciplina = (state: RootState) => state.disciplinaSlice.disciplina;
export const getListaDisciplina = (state: RootState) => state.disciplinaSlice.listaDisciplina;
export const getAcao = (state: RootState) => state.disciplinaSlice.acao;

export default slice.reducer;