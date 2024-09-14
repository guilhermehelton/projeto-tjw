import React from 'react'
import './App.css'
import CadAlunoForm from './pages/aluno/CadAlunoForm'
import SideBar from './components/sideBar/SideBar'
import { Route, Routes } from 'react-router-dom'
import CadProfessorForm from './pages/professor/CadProfessorForm'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import ListarAluno from './pages/aluno/ListarAluno'
import ListarProfessor from './pages/professor/ListarProfessor'
import { CadTurmaForm } from './pages/turma/CadTurmaForm'
import { Home } from './pages/home/Home'
import { CadDisciplinaForm } from './pages/disciplina/CadDisciplinaForm'
import { ListarDisciplina } from './pages/disciplina/ListarDisciplina'
import { ListarTurma } from './pages/turma/ListarTurma'

function App() {

  return (
    <Provider store={store}>
      <div className='app'>
        <div className='sidebar-wrapper'>
          <SideBar />
        </div>
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/aluno' element={<ListarAluno />} />
            <Route path='/aluno/cadastro' element={<CadAlunoForm />} />
            <Route path='/turma' element={<ListarTurma />} />
            <Route path='/turma/cadastro' element={<CadTurmaForm />} />
            <Route path='/disciplina' element={<ListarDisciplina />} />
            <Route path='/disciplina/cadastro' element={<CadDisciplinaForm />} />
            <Route path='/professor' element={<ListarProfessor />} />
            <Route path='/professor/cadastro' element={<CadProfessorForm />} />
          </Routes>
        </div>
      </div>
    </Provider>
  )
}

export default App
