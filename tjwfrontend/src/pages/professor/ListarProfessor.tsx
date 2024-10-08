import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, consultarProfessores, deleteProfessor, getListaProfessores, limparProfessor, ProfessorType, setAcao, setProfessor } from "./professorSlice";
import Button from "../../components/button/Button";
import Table, { ActionType } from "../../components/table/Table";
import SideBar from "../../components/sideBar/SideBar";
import { AuthContext } from "../../contexts/AuthContext";

const ListarProfessor = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const listaProfessores = useAppSelector(getListaProfessores);
    const {usuario, authToken} = useContext(AuthContext);

    useEffect(() => {
        dispatch(consultarProfessores(authToken));
    }, [])

    const handleCadastrar = () => {
        dispatch(setAcao(ACAO_CADASTRAR));
        dispatch(limparProfessor());
        navigate("/professor/cadastro");
    }

    const acoes = (professor: ProfessorType): ActionType[] => {
        return [
            {
                onClick: () => {
                    dispatch(setAcao(ACAO_ATUALIZAR));
                    dispatch(setProfessor(professor));
                    navigate("/professor/cadastro");
                }
            },
            {
                onClick: () => {
                    dispatch(deleteProfessor(professor.id as number, authToken));
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
                    <h2>Lista de professores</h2>
                    <div className="form-row" style={{ justifyContent: 'flex-end', width: '80%', marginBottom: '1em' }}>
                        <Button onClick={(_e) => handleCadastrar()} name="Cadastrar" />
                    </div>
                    <Table actions={(n: ProfessorType) => acoes(n)} list={listaProfessores}
                        keys={['nome', 'email', 'cpf', 'telefone', 'dataNascimento']}>
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

export default ListarProfessor;