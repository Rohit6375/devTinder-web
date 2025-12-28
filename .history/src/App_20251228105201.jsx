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
import { Connections } from './component/Connections'
import Requests from './component/Requests'
import ProtectedRoute from './component/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
   <Routes>
  <Route element={<Body />}>
    {/* Public */}
    <Route path="/login" element={<Login />} />

    {/* Protected */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Feed />
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />

    <Route
      path="/connections"
      element={
        <ProtectedRoute>
          <Connections />
        </ProtectedRoute>
      }
    />

    <Route
      path="/requests"
      element={
        <ProtectedRoute>
          <Requests />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<Error />} />
  </Route>
</Routes>

    </BrowserRouter>
   </Provider>
    </>
  )
}

export default App
