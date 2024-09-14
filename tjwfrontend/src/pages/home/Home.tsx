import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks"
import { consultarAlunos } from "../aluno/alunoSlice";
import { consultarProfessores } from "../professor/professorSlice";

export const Home = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(consultarAlunos());
        dispatch(consultarProfessores());
    }, [])

    return(
        <div>
            <h2>Bem vindo!</h2>
        </div>
    )
}