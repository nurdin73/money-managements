import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { CCard, CCardBody, CButtonGroup, CButton } from '@coreui/react'
import { useSearchParams } from 'react-router-dom'
import StatisticPerDays from './_partials/StatisticPerDays'
import StatisticPerMonths from './_partials/StatisticPerMonths'
import StatisticPerYears from './_partials/StatisticPerYears'
import { connect } from 'react-redux'
import { loadReportIncomeExpense } from '@/redux/actions'

const ReportPage = ({ loadReportIncomeExpenseList }) => {
  const [getActiveStat, setActiveStat] = useSearchParams('stat=days')

  const activeStat = getActiveStat.get('stat')

  React.useEffect(() => {
    const controller = new AbortController()
    loadReportIncomeExpenseList(null, controller.signal)
  }, [])

  return (
    <>
      <CCard>
        <CCardBody>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h4 className='card-title mb-0'>Laporan Keuangan</h4>
            <CButtonGroup>
              <CButton
                color={activeStat === 'days' ? 'primary' : 'light'}
                onClick={() => {
                  setActiveStat('stat=days')
                }}
              >
                Days
              </CButton>
              <CButton
                color={activeStat === 'months' ? 'primary' : 'light'}
                onClick={() => {
                  setActiveStat('stat=months')
                }}
              >
                Months
              </CButton>
              <CButton
                color={activeStat === 'years' ? 'primary' : 'light'}
                onClick={() => {
                  setActiveStat('stat=years')
                }}
              >
                Years
              </CButton>
            </CButtonGroup>
          </div>

          {/* Chart */}
          {activeStat === 'days' && <StatisticPerDays />}
          {activeStat === 'months' && <StatisticPerMonths />}
          {activeStat === 'years' && <StatisticPerYears />}
        </CCardBody>
      </CCard>
    </>
  )
}

export default connect(null, {
  loadReportIncomeExpenseList: loadReportIncomeExpense,
})(ReportPage)
