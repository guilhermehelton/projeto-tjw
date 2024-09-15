import { Route, Routes } from "react-router-dom"
import ListarAluno from "./aluno/ListarAluno"
import CadAlunoForm from "./aluno/CadAlunoForm"
import { ListarTurma } from "./turma/ListarTurma"
import { CadTurmaForm } from "./turma/CadTurmaForm"
import { ListarDisciplina } from "./disciplina/ListarDisciplina"
import { CadDisciplinaForm } from "./disciplina/CadDisciplinaForm"
import ListarProfessor from "./professor/ListarProfessor"
import CadProfessorForm from "./professor/CadProfessorForm"
import SideBar from "../components/sideBar/SideBar"
import { PrivateRoutes } from "../privateRoutes"

export const MainPage = () => {
    return (
        <>
            <div className='sidebar-wrapper'>
                <SideBar />
            </div>
            <div className='content-container'>
                <Routes>
                    <Route path='/aluno/cadastro' element={<CadAlunoForm />} />
                    <Route path='/turma' element={<ListarTurma />} />
                    <Route path='/turma/cadastro' element={<CadTurmaForm />} />
                    <Route path='/disciplina' element={<ListarDisciplina />} />
                    <Route path='/disciplina/cadastro' element={<CadDisciplinaForm />} />
                    <Route path='/professor' element={<ListarProfessor />} />
                    <Route path='/professor/cadastro' element={<CadProfessorForm />} />
                </Routes>
            </div>
        </>
    )
}