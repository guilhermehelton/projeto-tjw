import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfessorType } from "../professor/professorSlice";
import { DisciplinaType } from "../disciplina/disciplinaSlice";
import { AlunoType } from "../aluno/alunoSlice";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";
import { serializeStringToLocalDate } from "../utils/FormatData";

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

export const consultarTurmas = (token: string) => (dispatch : AppDispatch) => {
    axios.get(BACKEND_URL + '/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch(setListaTurma(response.data));
        })
}

export const postCriarTurma = (turma : TurmaType, token: string) => (dispatch : AppDispatch) => {
    axios.post(BACKEND_URL + '/criar', preparaTurmaEnvio(turma), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(_reponse => {
            dispatch(consultarTurmas(token));
            dispatch(limparTurma());
        }
    )
}

export const putAtualizarTurma = (id: number, turma: TurmaType, token: string) => (dispatch: AppDispatch) => {
    axios.put(BACKEND_URL + `/atualizar/${id}`, preparaTurmaEnvio(turma), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(_response => {
            dispatch(consultarTurmas(token));
            dispatch(limparTurma());
            dispatch(setAcao(null));
        })
}

export const deleteTurma = (id: number, token: string) => (dispatch: AppDispatch) => {
    axios.delete(BACKEND_URL + `/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(_response => {
            dispatch(consultarTurmas(token));
        })
}

const preparaTurmaEnvio = (turma: TurmaType) : TurmaType => {
    return {
        ...turma,
        alunos: turma.alunos.map(aluno => {
            return {
                ...aluno,
                dataNascimento: serializeStringToLocalDate(aluno.dataNascimento),
            }
        }),
        professor: {
            ...turma.professor,
            dataNascimento: serializeStringToLocalDate(turma.professor.dataNascimento)
        }
    }
}

export const getTurma = (state: RootState) => state.turmaSlice.turma;
export const getListaTurma = (state: RootState) => state.turmaSlice.listaTurma;
export const getAcao = (state: RootState) => state.turmaSlice.acao;

export default slice.reducer;