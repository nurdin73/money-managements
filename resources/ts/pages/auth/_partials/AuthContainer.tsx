import React from 'react'
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import { Outlet } from 'react-router-dom'

export default function AuthContainer() {
  return (
    <div>
      <div className='bg-body-tertiary min-vh-100 d-flex flex-row align-items-center'>
        <CContainer>
          <CRow className='justify-content-center'>
            <CCol xl={5} lg={6} md={10}>
              <CCard className='p-4'>
                <CCardBody>
                  <Outlet />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}
