import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { consultarProfessores, getListaProfessores, limparProfessor, ProfessorType, setProfessor } from "./professorSlice";
import Button from "../../components/button/Button";
import Table, { ActionType } from "../../components/table/Table";

const ListarProfessor = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const listaProfessores = useAppSelector(getListaProfessores);

    useEffect(() => {
        dispatch(consultarProfessores());
    }, [])

    const handleCadastrar = () => {
        dispatch(limparProfessor());
        navigate("/professor/cadastro");
    }

    const acoes = (professor: ProfessorType) : ActionType[] => {
        return [
            {
                onClick: () => {
                    dispatch(setProfessor(professor));
                    navigate("/professor/cadastro");
                }
            },
            {
                onClick: () => {
                    dispatch(setProfessor(professor));
                    navigate("/professor/cadastro");
                }
            }
        ]
    }

    return(
        <div className="table-container">
            <h2>Lista de professores</h2>
            <div className="form-row" style={{justifyContent: 'flex-end', width: '80%', marginBottom: '1em'}}>
                <Button onClick={(_e) => handleCadastrar()} name="Cadastrar"/>
            </div>
            <Table actions={(n: ProfessorType) => acoes(n)} list={listaProfessores} 
                keys={['nome', 'email', 'cpf', 'telefone', 'dataNascimento']}>
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

export default ListarProfessor;