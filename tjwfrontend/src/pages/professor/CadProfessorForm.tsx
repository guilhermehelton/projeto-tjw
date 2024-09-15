import React, { useContext } from "react";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, getAcao, getProfessor, postCriarProfessor, putAtualizarProfessor, setCampoProfessor } from "./professorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { handleCpfInput, handleDataInput, handleTelInput } from "../utils/MaskInputHandle";
import SideBar from "../../components/sideBar/SideBar";
import { AuthContext } from "../../contexts/AuthContext";

const CadProfessorForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const professor = useAppSelector(getProfessor);
    const acao = useAppSelector(getAcao);
    const {usuario, authToken} = useContext(AuthContext);

    const getCampoNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        let campo = {
            id: event.target.id,
            value: event.target.value,
        };
        if (event.target.id == "telefone") {
            campo.value = handleTelInput(event.target.value);
        }
        if (event.target.id == "cpf") {
            campo.value = handleCpfInput(event.target.value);
        }
        if (event.target.id == "dataNascimento") {
            campo.value = handleDataInput(event.target.value);
        }

        return campo
    }

    const handleCadastrar = () => {
        console.log(professor)
        if (acao == ACAO_ATUALIZAR && professor.id != undefined) {
            dispatch(putAtualizarProfessor(professor.id, professor, authToken));
        } else if (acao == ACAO_CADASTRAR) {
            dispatch(postCriarProfessor(professor, authToken));
        }
        navigate('/professor')
    }

    return (
        <>
            <div className='sidebar-wrapper'>
                <SideBar />
            </div>
            <div className="content-container">
                <div className="form-container">
                    <h2>{acao == ACAO_CADASTRAR ? 'Cadastro de Professor' : 'Atualizar professor'}</h2>

                    <div className="form-row">
                        <Input className="no-margin-left" id="nome" name="nome" label="Nome" value={professor.nome ? professor.nome : ''}
                            onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                        <Input id="email" name="email" label="E-mail" value={professor.email ? professor.email : ''}
                            onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                    </div>
                    <div className="form-row">
                        <Input className="no-margin-left" id="cpf" name="cpf" label="CPF" placeholder="###.###.###-##" maxLength={14}
                            value={professor.cpf ? professor.cpf : ''}
                            onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                        <Input id="telefone" name="telefone" label="Telefone" placeholder="(DD)xxxxx-xxxx" maxLength={15}
                            value={professor.telefone ? professor.telefone : ''}
                            onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                        <Input id="dataNascimento" name="dataNascimento" label="Data de nascimento" placeholder="dd/MM/yyyy" maxLength={10}
                            value={professor.dataNascimento ? professor.dataNascimento : ''}
                            onChange={(e) => dispatch(setCampoProfessor(getCampoNameValue(e)))} />
                    </div>
                    <div className="form-row">
                        <Button onClick={(_e) => navigate("/professor")} className="no-margin-left" isSecondary name="Cancelar" />
                        <Button onClick={(_e) => handleCadastrar()} name="Confirmar" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CadProfessorForm;