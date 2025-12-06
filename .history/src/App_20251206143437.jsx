import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Body from './component/Body'
import Login from './component/Login'
import Profile from './component/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './component/Feed'
import Error from './component/Error'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/' element={<Feed/>}/>

      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path="*" element={<Error/>} />
      </Route>
    </Routes>
    </BrowserRouter>
   </Provider>
    </>
  )
}

export default App
