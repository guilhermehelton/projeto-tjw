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

function App() {

  return (
    <Provider store={store}>
      <div className='app'>
        <div className='sidebar-wrapper'>
          <SideBar />
        </div>
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<h2>Bem vindo!</h2>}/>
            <Route path='/aluno' element={<ListarAluno />} />
            <Route path='/aluno/cadastro' element={<CadAlunoForm />} />
            <Route path='/professor' element={<ListarProfessor />} />
            <Route path='/professor/cadastro' element={<CadProfessorForm />} />
          </Routes>
        </div>
      </div>
    </Provider>
  )
}

export default App
