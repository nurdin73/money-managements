import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import { Formik } from 'formik'
import React from 'react'
import { initialValues, tabs, validationSchema } from './constants'
import Scaffold from './_partials/Scaffold'
import useGenerator from './hook'
import GeneratorProvider from './provider'
import clsx from 'clsx'
import View from './_partials/View'

function GeneratorPage() {
  const [tab, setTab] = React.useState('Scaffold')
  const { handleSubmit } = useGenerator()

  return (
    <GeneratorProvider>
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
                    <CNavLink
                      onClick={() => setTab(t)}
                      className='cursor-pointer'
                      active={t === tab}
                    >
                      {t}
                    </CNavLink>
                  </CNavItem>
                ))}
              </CNav>
            </CCardHeader>
            <CCardBody>
              {tab === 'Scaffold' && <Scaffold />}
              {tab === 'View' && <View />}
            </CCardBody>
            <CCardFooter
              className={clsx('d-flex align-items-center', {
                'justify-content-between': tab !== 'Scaffold',
                'justify-content-end': tab === 'Scaffold',
              })}
            >
              {tab !== 'Scaffold' && (
                <CButton
                  color='secondary'
                  type='button'
                  onClick={() => {
                    const findIndex = tabs.findIndex((t) => t === tab)
                    setTab(tabs[findIndex - 1])
                  }}
                >
                  Prev
                </CButton>
              )}
              {tab !== 'Preview' && (
                <CButton
                  color='primary'
                  type='button'
                  onClick={() => {
                    const findIndex = tabs.findIndex((t) => t === tab)
                    setTab(tabs[findIndex + 1])
                  }}
                >
                  Next
                </CButton>
              )}
              {tab === 'Preview' && (
                <CButton color='primary' onClick={() => handleSubmit()}>
                  Generate
                </CButton>
              )}
            </CCardFooter>
          </CCard>
        )}
      </Formik>
    </GeneratorProvider>
  )
}

export default GeneratorPage
