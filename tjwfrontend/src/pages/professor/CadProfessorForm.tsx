import React from "react";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, getAcao, getProfessor, postCriarProfessor, putAtualizarProfessor, setCampoProfessor } from "./professorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const CadProfessorForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const professor = useAppSelector(getProfessor);
    const acao = useAppSelector(getAcao);

    const getCampoNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const campo = {
            id: event.target.id,
            value: event.target.value
        }
        return campo
    }

    const handleCadastrar = () => {
        console.log(professor)
        if (acao == ACAO_ATUALIZAR && professor.id != undefined) {
            dispatch(putAtualizarProfessor(professor.id, professor));
        } else if (acao == ACAO_CADASTRAR) {
            dispatch(postCriarProfessor(professor));
        }
        navigate('/professor')
    }

    return (
        <div className="form-container">
            <h2>{acao == ACAO_CADASTRAR ? 'Cadastro de Professor' : 'Atualizar professor'}</h2>

            <div className="form-row">
                <Input className="no-margin-left" id="nome" name="nome" label="Nome" value={professor.nome ? professor.nome : ''}
                    onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                <Input id="email" name="email" label="E-mail" value={professor.email ? professor.email : ''}
                    onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
            </div>
            <div className="form-row">
                <Input className="no-margin-left" id="cpf" name="cpf" label="CPF" placeholder="###.###.###-##"
                    value={professor.cpf ? professor.cpf : ''}
                    onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                <Input id="telefone" name="telefone" label="Telefone" placeholder="(DD)xxxxx-xxxx"
                    value={professor.telefone ? professor.telefone : ''}
                    onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                <Input id="dataNascimento" name="dataNascimento" label="Data de nascimento" placeholder="dd/MM/yyyy"
                    value={professor.dataNascimento ? professor.dataNascimento : ''}
                    onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
            </div>
            <div className="form-row">
                <Button onClick={(_e) => navigate("/professor")} className="no-margin-left" isSecondary name="Cancelar" />
                <Button onClick={(_e) => handleCadastrar()} name="Confirmar" />
            </div>
        </div>
    )
}

export default CadProfessorForm;