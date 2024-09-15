import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { AuthContextProvider } from './contexts/AuthContext'
import { Login } from './pages/auth/Login'
import { Cadastrar } from './pages/auth/Cadastrar'
import { PrivateRoutes } from './privateRoutes'
import ListarAluno from './pages/aluno/ListarAluno'
import CadAlunoForm from './pages/aluno/CadAlunoForm'
import { ListarTurma } from './pages/turma/ListarTurma'
import { CadTurmaForm } from './pages/turma/CadTurmaForm'
import { ListarDisciplina } from './pages/disciplina/ListarDisciplina'
import { CadDisciplinaForm } from './pages/disciplina/CadDisciplinaForm'
import ListarProfessor from './pages/professor/ListarProfessor'
import CadProfessorForm from './pages/professor/CadProfessorForm'

function App() {

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <div className='app'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastro' element={<Cadastrar />} />
            <Route path='/aluno' element={<PrivateRoutes />}>
              <Route path='/aluno' element={<ListarAluno />} />
            </Route>
            <Route path='/aluno/cadastro' element={<PrivateRoutes />}>
              <Route path='/aluno/cadastro' element={<CadAlunoForm />} />
            </Route>
            <Route path='/turma' element={<PrivateRoutes />}>
              <Route path='/turma' element={<ListarTurma />} />
            </Route>
            <Route path='/turma/cadastro' element={<PrivateRoutes />}>
              <Route path='/turma/cadastro' element={<CadTurmaForm />} />
            </Route>
            <Route path='/disciplina' element={<PrivateRoutes />}>
              <Route path='/disciplina' element={<ListarDisciplina />} />
            </Route>
            <Route path='/disciplina/cadastro' element={<PrivateRoutes />}>
              <Route path='/disciplina/cadastro' element={<CadDisciplinaForm />} />
            </Route>
            <Route path='/professor' element={<PrivateRoutes />}>
              <Route path='/professor' element={<ListarProfessor />} />
            </Route>
            <Route path='/professor/cadastro' element={<PrivateRoutes />}>
              <Route path='/professor/cadastro' element={<CadProfessorForm />} />
            </Route>
          </Routes>
        </div>
      </Provider>
    </AuthContextProvider>
  )
}

export default App
