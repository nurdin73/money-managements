import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink } from '@coreui/react'
import { Formik } from 'formik'
import React from 'react'
import { initialValues, tabs, validationSchema } from './constants'
import Scaffold from './_partials/Scaffold'
import useGenerator from './hook'
import GeneratorProvider from './provider'

function GeneratorPage() {
  const [tab, setTab] = React.useState('Scaffold')
  const { handleSubmit } = useGenerator()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <CCard>
          <CCardHeader className='p-0'>
            <CNav variant='underline-border' layout='justified'>
              {tabs.map((t) => (
                <CNavItem key={t}>
                  <CNavLink onClick={() => setTab(t)} className='cursor-pointer' active={t === tab}>
                    {t}
                  </CNavLink>
                </CNavItem>
              ))}
            </CNav>
          </CCardHeader>
          <CCardBody>
            <GeneratorProvider>{tab === 'Scaffold' && <Scaffold />}</GeneratorProvider>
          </CCardBody>
        </CCard>
      )}
    </Formik>
  )
}

export default GeneratorPage
