import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ACAO_ATUALIZAR, ACAO_CADASTRAR, getAcao, getDisciplina, postCriarDisciplina, putAtualizarDisciplina, setCampoDisciplina } from "./disciplinaSlice";

export const CadDisciplinaForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const disciplina = useAppSelector(getDisciplina);
    const acao = useAppSelector(getAcao);

    const getCampoNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const campo = {
            id: event.target.id,
            value: event.target.value
        }
        return campo
    }

    const handleCadastrar = () => {
        if (acao == ACAO_ATUALIZAR && disciplina.id != undefined) {
            dispatch(putAtualizarDisciplina(disciplina.id, disciplina));
        } else if (acao == ACAO_CADASTRAR) {
            console.log(disciplina);
            dispatch(postCriarDisciplina(disciplina));
        }
        navigate('/disciplina')
    }

    return (
        <div className="form-container">
            <h2>Cadastro de disciplina</h2>

            <div className="form-row">
                <Input className="no-margin-left" id="nome" name="nome" label="Nome" value={disciplina.nome ? disciplina.nome : ''}
                    onChange={(e) => dispatch(setCampoDisciplina(getCampoNameValue(e)))} />
            </div>
            <div className="form-row">
                <Button onClick={(_e) => navigate("/disciplina")} className="no-margin-left" isSecondary name="Cancelar" />
                <Button onClick={(_e) => handleCadastrar()} name="Confirmar" />
            </div>
        </div>
    )
}