import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfessorType } from "../professor/professorSlice";
import { DisciplinaType } from "../disciplina/disciplinaSlice";
import { AlunoType } from "../aluno/alunoSlice";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";

export type TurmaType = {
    id?: number,
    professor: ProfessorType,
    semestre: string,
    alunos: AlunoType[],
    disciplina: DisciplinaType, 
}

const BACKEND_URL = 'http://localhost:9001/turma';

export const ACAO_CADASTRAR = 'CADASTRAR_TURMA';
export const ACAO_ATUALIZAR = 'ATUALIZAR_TURMA';

const slice = createSlice({
    name: 'turma',
    initialState: {
        listaTurma: [] as TurmaType[],
        turma: {
            alunos: [] as AlunoType[],
            disciplina: {} as DisciplinaType,
            professor: {} as ProfessorType,
            semestre: '',
        } as TurmaType,
        acao: null
    },
    reducers: {
        setTurma: (state, action) => {
            state.turma = {...action.payload };
        },
        setListaTurma: (state, action) => {
            state.listaTurma = [...action.payload];
        },
        setProfessorTurma: (state, action : PayloadAction<ProfessorType>) => {
            state.turma.professor = action.payload;
        },
        setDisciplinaTurma: (state, action: PayloadAction<DisciplinaType>) => {
            state.turma.disciplina = action.payload;
        },
        addAlunoTurma: (state, action: PayloadAction<AlunoType>) => {
            state.turma.alunos.push(action.payload);
        },
        setSemestre: (state, action) => {
            state.turma.semestre = action.payload;
        },
        limparTurma: (state) => {
            state.turma = {} as TurmaType;
            state.turma.alunos = [] as AlunoType[];
            state.turma.disciplina = {} as DisciplinaType;
            state.turma.professor = {} as ProfessorType;
        },
        setAcao: (state, action) => {
            state.acao = action.payload;
        }
    }
})

export const { setTurma, setListaTurma, setProfessorTurma,
        setDisciplinaTurma, addAlunoTurma, setSemestre, limparTurma, setAcao } = slice.actions;

export const consultarTurmas = () => (dispatch : AppDispatch) => {
    axios.get(BACKEND_URL + '/')
        .then(response => {
            dispatch(setListaTurma(response.data));
        })
}

export const postCriarTurma = (turma : TurmaType) => (dispatch : AppDispatch) => {
    axios.post(BACKEND_URL + '/criar', turma)
        .then(_reponse => {
            dispatch(consultarTurmas());
            dispatch(limparTurma());
        }
    )
}

export const putAtualizarTurma = (id: number, turma: TurmaType) => (dispatch: AppDispatch) => {
    axios.put(BACKEND_URL + `/atualizar/${id}`, turma)
        .then(_response => {
            dispatch(consultarTurmas());
            dispatch(limparTurma());
            dispatch(setAcao(null));
        })
}

export const deleteTurma = (id: number) => (dispatch: AppDispatch) => {
    axios.delete(BACKEND_URL + `/${id}`)
        .then(_response => {
            dispatch(consultarTurmas());
        })
}

export const getTurma = (state: RootState) => state.turmaSlice.turma;
export const getListaTurma = (state: RootState) => state.turmaSlice.listaTurma;
export const getAcao = (state: RootState) => state.turmaSlice.acao;

export default slice.reducer;