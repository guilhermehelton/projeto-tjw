import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, consultarTurmas, deleteTurma, getListaTurma, limparTurma, setAcao, setTurma, TurmaType } from "./turmaSlice";
import { useContext, useEffect } from "react";
import Table, { ActionType } from "../../components/table/Table";
import Button from "../../components/button/Button";
import SideBar from "../../components/sideBar/SideBar";
import { AuthContext } from "../../contexts/AuthContext";

export const ListarTurma = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const listaTurma = useAppSelector(getListaTurma);
    const {usuario, authToken} = useContext(AuthContext);

    useEffect(() => {
        dispatch(consultarTurmas(authToken));
    }, [])

    const handleCadastrar = () => {
        dispatch(setAcao(ACAO_CADASTRAR));
        dispatch(limparTurma());
        navigate("/turma/cadastro");
    }

    const formatTurma = () => {
        const listaFormatada = listaTurma.map(turma => {
            return {
                id: turma.id,
                disciplina: turma.disciplina ? turma.disciplina.nome : '-',
                professor: turma.professor ? turma.professor.nome : '-',
                semestre: turma.semestre,
                alunos: turma.alunos,
            }
        })
        return listaFormatada;
    }

    const getElementoOriginal = (itemFormatado: any) => {
        const elementoOriginal = listaTurma.filter(elemento => elemento.id == itemFormatado.id)[0];
        return elementoOriginal;
    }

    const acoes = (turma: TurmaType): ActionType[] => {
        return [
            {
                onClick: () => {
                    dispatch(setAcao(ACAO_ATUALIZAR));
                    dispatch(setTurma(getElementoOriginal(turma)));
                    navigate("/turma/cadastro");
                }
            },
            {
                onClick: () => {
                    dispatch(deleteTurma(turma.id as number, authToken));
                }
            }
        ]
    }

    return (
        <>
            <div className='sidebar-wrapper'>
                <SideBar />
            </div>
            <div className="content-container">
                <div className="table-container">
                    <h2>Lista de turmas</h2>
                    <div className="form-row" style={{ justifyContent: 'flex-end', width: '80%', marginBottom: '1em' }}>
                        <Button onClick={(_e) => handleCadastrar()} name="Cadastrar" />
                    </div>
                    <Table actions={(turma: TurmaType) => acoes(turma)} list={formatTurma()} keys={['disciplina', 'semestre', 'professor']}>
                        <th>Disciplina</th>
                        <th>Semestre</th>
                        <th>Professor</th>
                        <th style={{ width: '10%' }}>Ações</th>
                    </Table>
                </div>
            </div>
        </>
    )
}