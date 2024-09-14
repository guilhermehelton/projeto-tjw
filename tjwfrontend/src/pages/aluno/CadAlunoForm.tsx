import React from "react";
import './CadAlunoForm.css';
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, getAcao, getAluno, postCriarAluno, putAtualizarAluno, setCampoAluno } from "./alunoSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const CadAlunoForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const aluno = useAppSelector(getAluno);
    const acao = useAppSelector(getAcao);

    const getCampoNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const campo = {
            id: event.target.id,
            value: event.target.value
        }
        return campo
    }

    const handleCadastrar = () => {
        if (acao == ACAO_ATUALIZAR && aluno.id != undefined) {
            dispatch(putAtualizarAluno(aluno.id, aluno));
        } else if (acao == ACAO_CADASTRAR) {
            dispatch(postCriarAluno(aluno));
        }
        navigate('/aluno')
    }

    return (
        <div className="form-container">
            <h2>{acao == ACAO_CADASTRAR ? 'Cadastro de aluno' : 'Atualizar aluno'}</h2>

            <div className="form-row">
                <Input className="no-margin-left" id="nome" name="nome" label="Nome" value={aluno.nome ? aluno.nome : ''}
                    onChange={(e) => dispatch(setCampoAluno(getCampoNameValue(e)))} />
                <Input id="email" name="email" label="E-mail" value={aluno.email ? aluno.email : ''}
                    onChange={(e) => dispatch(setCampoAluno(getCampoNameValue(e)))} />
            </div>
            <div className="form-row">
                <Input className="no-margin-left" id="cpf" name="cpf" label="CPF" placeholder="###.###.###-##"
                    value={aluno.cpf ? aluno.cpf : ''}
                    onChange={(e) => dispatch(setCampoAluno(getCampoNameValue(e)))} />
                <Input id="telefone" name="telefone" label="Telefone" placeholder="(DD)xxxxx-xxxx"
                    value={aluno.telefone ? aluno.telefone : ''}
                    onChange={(e) => dispatch(setCampoAluno(getCampoNameValue(e)))} />
                <Input id="dataNascimento" name="dataNascimento" label="Data de nascimento" placeholder="dd/MM/yyyy"
                    value={aluno.dataNascimento ? aluno.dataNascimento : ''}
                    onChange={(e) => dispatch(setCampoAluno(getCampoNameValue(e)))} />
            </div>
            <div className="form-row">
                <Button onClick={(_e) => navigate("/aluno")} className="no-margin-left" isSecondary name="Cancelar" />
                <Button onClick={(_e) => handleCadastrar()} name="Confirmar" />
            </div>
        </div>
    )
}

export default CadAlunoForm;