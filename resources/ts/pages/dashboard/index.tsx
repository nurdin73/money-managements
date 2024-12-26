import React from 'react'
import HeaderDashboard from './_partials/HeaderDashboard'
import BasicStatistics from './_partials/BasicStatistics'
import { CCol, CRow } from '@coreui/react'
import ExpenseDetails from './_partials/ExpenseDetails'
import TotalBudget from './_partials/TotalBudget'
import FinanceIndicator from './_partials/FinanceIndicator'
import IncomeExpenseLatest from './_partials/IncomeExpenseLatest'

function DashboardPage() {
  return (
    <>
      <HeaderDashboard />
      <BasicStatistics />
      <CRow className='mb-4'>
        <CCol md={8}>
          <ExpenseDetails />
        </CCol>
        <CCol md={4}>
          <TotalBudget />
        </CCol>
      </CRow>
      <FinanceIndicator />
      <IncomeExpenseLatest />
    </>
  )
}

export default DashboardPage
