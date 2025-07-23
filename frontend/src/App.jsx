import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes> 
    </>
  )
}

export default App
