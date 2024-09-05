import React from 'react'
import './App.css'
import CadAlunoForm from './pages/aluno/CadAlunoForm'
import SideBar from './components/sideBar/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CadProfessorForm from './pages/professor/CadProfessorForm'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <div className='app'>
        <div className='sidebar-wrapper'>
          <SideBar />
        </div>
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<CadAlunoForm />} />
            <Route path='/professor' element={<CadProfessorForm />} />
          </Routes>
        </div>
      </div>
    </Provider>
  )
}

export default App
