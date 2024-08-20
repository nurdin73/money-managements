import React, { Fragment, Suspense, useEffect } from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import AuthPage from './pages/auth'
import { ToastContainer } from 'react-toastify'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state: any) => state.defaultStateApp.theme)

  const { currentUser } = useSelector((state: any) => state.authApp)

  useEffect(() => {
    const urlParams: any = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className='pt-3 text-center'>
            <CSpinner color='primary' variant='grow' />
          </div>
        }
      >
        <Routes>
          {/* <Route path='/login' id='Login Page' element={<Login />} />
          <Route path='/register' id='Register Page' element={<Register />} /> */}
          {currentUser ? (
            <>
              <Route path='*' id='Home' element={<DefaultLayout />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
          {/* <Route path='auth/*' element={<AuthPage />} /> */}
          <Route path='/404' id='Page 404' element={<Page404 />} />
          <Route path='/500' id='Page 500' element={<Page500 />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
