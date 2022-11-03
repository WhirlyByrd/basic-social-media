import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './store/authContext'
import './App.css'

import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'

const App = () => {

  const authCtx = useContext(AuthContext)

  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* //if no authCtx token, go to Auth component else go to home */}
        <Route path='/auth/*' element={!authCtx.token ? <Auth/> : <Navigate to='/' />}/>
        {/* //if there is a authCtx token let user go to Form, else go to auth because no permission */}
        <Route path='/form' element={authCtx.token ? <Form/> : <Navigate to='/auth'/>}/>
        {/* //if there is a authCtx token let user go to Profile, else go to auth because no permission */}
        <Route path='/profile' element={authCtx.token? <Profile/>: <Navigate to='/auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App
