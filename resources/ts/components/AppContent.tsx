import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import MTableProvider from './MTable/provider'

const AppContent = () => {
  return (
    <CContainer className='px-4 pb-4' lg>
      <Suspense fallback={<CSpinner color='primary' />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  id={route.name}
                  element={
                    <MTableProvider>
                      <route.element />
                    </MTableProvider>
                  }
                />
              )
            )
          })}
          <Route index path='/' element={<Navigate to='dashboard' replace />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
