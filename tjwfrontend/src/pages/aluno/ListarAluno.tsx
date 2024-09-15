import React, { useContext, useEffect } from "react";
import "./CadAlunoForm.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Table, { ActionType } from "../../components/table/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, AlunoType, consultarAlunos, deleteAluno, getListaAlunos, limparAluno, setAcao, setAluno } from "./alunoSlice";
import SideBar from "../../components/sideBar/SideBar";
import { AuthContext } from "../../contexts/AuthContext";

const ListarAluno = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {usuario, authToken} = useContext(AuthContext);
    const listaAlunos = useAppSelector(getListaAlunos);

    useEffect(() => {
        dispatch(consultarAlunos(authToken));
    }, [])

    const handleCadastrar = () => {
        dispatch(setAcao(ACAO_CADASTRAR));
        dispatch(limparAluno());
        navigate("/aluno/cadastro");
    }

    const acoes = (aluno: AlunoType): ActionType[] => {
        return [
            {
                onClick: () => {
                    dispatch(setAcao(ACAO_ATUALIZAR));
                    dispatch(setAluno(aluno));
                    navigate("/aluno/cadastro");
                }
            },
            {
                onClick: () => {
                    dispatch(deleteAluno(aluno.id as number, authToken));
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
                    <h2>Lista de alunos</h2>
                    <div className="form-row" style={{ justifyContent: 'flex-end', width: '80%', marginBottom: '1em' }}>
                        <Button onClick={(_e) => handleCadastrar()} name="Cadastrar" />
                    </div>
                    <Table actions={(aluno: AlunoType) => acoes(aluno)} list={listaAlunos} keys={['nome', 'email', 'cpf', 'telefone', 'dataNascimento']}>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Data Nascimento</th>
                        <th style={{ width: '10%' }}>Ações</th>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ListarAluno;