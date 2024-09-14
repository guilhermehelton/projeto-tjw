import { useEffect } from "react";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, consultarDisciplina, deleteDisciplina, DisciplinaType, getListaDisciplina, limparDisciplina, setAcao, setDisciplina } from "./disciplinaSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Table, { ActionType } from "../../components/table/Table";
import Button from "../../components/button/Button";

export const ListarDisciplina = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const listaDisciplina = useAppSelector(getListaDisciplina);

    useEffect(() => {
        dispatch(consultarDisciplina());
    }, [])

    const handleCadastrar = () => {
        dispatch(setAcao(ACAO_CADASTRAR));
        dispatch(limparDisciplina());
        navigate("/disciplina/cadastro");
    }

    const acoes = (disciplina: DisciplinaType): ActionType[] => {
        return [
            {
                onClick: () => {
                    dispatch(setAcao(ACAO_ATUALIZAR));
                    dispatch(setDisciplina(disciplina));
                    navigate("/disciplina/cadastro");
                }
            },
            {
                onClick: () => {
                    dispatch(deleteDisciplina(disciplina.id as number));
                }
            }
        ]
    }

    return (
        <div className="table-container">
            <h2>Lista de disciplinas</h2>
            <div className="form-row" style={{ justifyContent: 'flex-end', width: '80%', marginBottom: '1em' }}>
                <Button onClick={(_e) => handleCadastrar()} name="Cadastrar" />
            </div>
            <Table actions={(disciplina: DisciplinaType) => acoes(disciplina)} list={listaDisciplina} keys={['nome']}>
                <th>Nome</th>
                <th style={{ width: '10%' }}>Ações</th>
            </Table>
        </div>
    )
}