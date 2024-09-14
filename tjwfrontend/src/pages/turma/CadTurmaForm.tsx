import { useEffect } from "react";
import { Select } from "../../components/select/Select";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { consultarProfessores, getListaProfessores } from "../professor/professorSlice"
import { consultarAlunos, getListaAlunos } from "../aluno/alunoSlice";
import { SelectAutocomplete } from "../../components/select/SelectAutoComplete";
import { consultarDisciplina, getListaDisciplina } from "../disciplina/disciplinaSlice";
import Input from "../../components/input/Input";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, addAlunoTurma, getAcao, getTurma, postCriarTurma, putAtualizarTurma, setAcao, setDisciplinaTurma, setProfessorTurma, setSemestre } from "./turmaSlice";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

export const CadTurmaForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const turma = useAppSelector(getTurma)
    const professores = useAppSelector(getListaProfessores);
    const alunos = useAppSelector(getListaAlunos);
    const disciplinas = useAppSelector(getListaDisciplina);
    const acao = useAppSelector(getAcao);

    useEffect(() => {
        if(acao == null ) {
            dispatch(setAcao(ACAO_CADASTRAR))
        }
        if (professores.length == 0) {
            dispatch(consultarProfessores());
        }
        if (alunos.length == 0) {
            dispatch(consultarAlunos());
        }
        if (disciplinas.length == 0) {
            dispatch(consultarDisciplina());
        }
    }, [])

    const formatListSelect = (lista: any[]) => {
        const listaFormatada = lista.map(elemento => {
            return {
                id: elemento.id,
                label: elemento.nome,
            }
        })

        return listaFormatada;
    }

    const handleSelectAluno = (item: { id: number, label: string }) => {
        const alunoSelecionado = alunos.filter(aluno => aluno.id == item.id)[0];
        const alunoPreviamenteAdicionado = turma.alunos.filter(aluno => aluno.id == alunoSelecionado.id)[0];

        if(alunoPreviamenteAdicionado) {
            return;
        }
        dispatch(addAlunoTurma(alunoSelecionado));
    }

    const handleSelectDisciplina = (item: { id: number, label: string }) => {
        const disciplinaSelecionada = disciplinas.filter(disciplina => disciplina.id == item.id)[0];
        dispatch(setDisciplinaTurma(disciplinaSelecionada));
    }

    const handleSelectProfessor = (item: { id: number, label: string }) => {
        const professorSelecionado = professores.filter(professor => professor.id == item.id)[0];
        dispatch(setProfessorTurma(professorSelecionado));
    }

    const handleCadastrar = () => {
        if (acao == ACAO_ATUALIZAR && turma.id != undefined) {
            dispatch(putAtualizarTurma(turma.id, turma));
        } else if (acao == ACAO_CADASTRAR) {
            console.log(turma);
            dispatch(postCriarTurma(turma));
        }
        navigate('/turma')
    }

    return (
        <div className="form-container">
            <h2>{acao == ACAO_CADASTRAR ? 'Cadastro de turma' : 'Atualizar turma'}</h2>

            <div className="form-row">
                <Input id="semestre" label="Semestre" name="semestre" value={turma.semestre ? turma.semestre : ''}
                    onChange={(e) => dispatch(setSemestre(e.target.value))} />

                <Select label="Disciplina" id="select-disciplina" name="select-disciplina"
                    items={formatListSelect(disciplinas)} onSelect={(e) => handleSelectDisciplina(e)} />
            </div>
            <div className="form-row">
                <Select label="Professor" id="select-professor" name="select-professor"
                    items={formatListSelect(professores)} onSelect={(e) => handleSelectProfessor(e)} />
            </div>
            <div className="form-row">
                <SelectAutocomplete label="Adicionar alunos" id="select-aluno" name="select-aluno"
                    items={formatListSelect(alunos)} onSelect={(e) => handleSelectAluno(e)} />
            </div>
            <div className="form-row"><span style={{ fontWeight: '600' }}>Alunos matriculados</span></div>
            <div className="form-row">
                <Table list={turma.alunos} keys={['nome', 'email', 'telefone']}>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                </Table>
            </div>
            <div className="form-row" style={{marginTop: '50px'}}>
                <Button onClick={(_e) => navigate("/turma")} className="no-margin-left" isSecondary name="Cancelar" />
                <Button onClick={(_e) => handleCadastrar()} name="Confirmar" />
            </div>
        </div>
    )
}