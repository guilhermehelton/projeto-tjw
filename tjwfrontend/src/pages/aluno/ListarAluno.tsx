import React, { useEffect } from "react";
import "./CadAlunoForm.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Table, { ActionType } from "../../components/table/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { AlunoType, consultarAlunos, getListaAlunos, limparAluno, setAluno } from "./alunoSlice";

const ListarAluno = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const listaAlunos = useAppSelector(getListaAlunos);

    useEffect(() => {
        dispatch(consultarAlunos());
    }, [])

    const handleCadastrar = () => {
        dispatch(limparAluno());
        navigate("/aluno/cadastro");
    }

    const acoes = (aluno: AlunoType) : ActionType[] => {
        return [
            {
                onClick: () => {
                    dispatch(setAluno(aluno));
                    navigate("/aluno/cadastro");
                }
            },
            {
                onClick: () => {
                    dispatch(setAluno(aluno));
                    navigate("/aluno/cadastro");
                }
            }
        ]
    }

    return(
        <div className="table-container">
            <h2>Lista de alunos</h2>
            <div className="form-row" style={{justifyContent: 'flex-end', width: '80%', marginBottom: '1em'}}>
                <Button onClick={(_e) => handleCadastrar()} name="Cadastrar"/>
            </div>
            <Table actions={(aluno: AlunoType) => acoes(aluno)} list={listaAlunos} keys={['nome', 'email', 'cpf', 'telefone', 'dataNascimento']}>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Data Nascimento</th>
                <th style={{width: '10%'}}>Ações</th>
            </Table>
        </div>
    )
}

export default ListarAluno;