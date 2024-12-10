import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editior from './pages/Editor'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/editior/:projectId' element={<Editior />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
