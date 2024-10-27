import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AuthContainer from './_partials/AuthContainer'
import { useSelector } from 'react-redux'

const Login = React.lazy(() => import('./login/Login'))
const Verify = React.lazy(() => import('./verify'))
const ForgotPassword = React.lazy(() => import('./forgot-password'))
const ResetPassword = React.lazy(() => import('./reset-password'))
const Register = React.lazy(() => import('./register/Register'))

export default function AuthPage() {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: any) => state.authApp)

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', {
        replace: true,
      })
    }
  }, [currentUser])

  return (
    <Routes>
      <Route element={<AuthContainer />}>
        <Route path='/login' id='Login Page' element={<Login />} />
        <Route path='/verify' id='Verify Page' element={<Verify />} />
        <Route path='/forgot-password' id='Forgot Password Page' element={<ForgotPassword />} />
        <Route path='/reset-password' id='Reset Password Page' element={<ResetPassword />} />
        <Route path='/register' id='Register Page' element={<Register />} />
        <Route index element={<Login />} />
      </Route>
    </Routes>
  )
}
