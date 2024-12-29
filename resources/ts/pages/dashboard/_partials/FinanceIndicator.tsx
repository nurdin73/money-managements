import { stringFormatter } from '@/helpers/string'
import { loadBudgetEffeciency, loadRatio } from '@/redux/actions'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs'
import dayjs from 'dayjs'
import React from 'react'
import { connect } from 'react-redux'

function FinanceIndicator({
  dateRanges,
  loadRatioAction,
  loadBudgetEffeciencyAction,
  ratio,
  budgetEffeciency,
}) {
  const periode = React.useMemo(() => {
    const { startDate, endDate } = dateRanges
    return startDate
      ? `${dayjs(startDate).format('DD MMM YYYY')} - ${dayjs(endDate).format('DD MMM YYYY')}`
      : '-'
  }, [dateRanges])

  React.useEffect(() => {
    if (dateRanges.endDate) {
      const startDate = dayjs(dateRanges.startDate).format('YYYY-MM-DD')
      const endDate = dayjs(dateRanges.endDate).format('YYYY-MM-DD')

      loadRatioAction({
        start_periode: startDate,
        end_periode: endDate,
      })

      loadBudgetEffeciencyAction({
        start_periode: startDate,
        end_periode: endDate,
      })
    }
  }, [dateRanges.endDate])

  const labelEffeciencies = Object.keys(budgetEffeciency.data ?? {})

  return (
    <CRow>
      <CCol sm={4}>
        <CCard className='h-100'>
          <CCardBody>
            <h5>Rasio Pengeluaran</h5>
            <CChartDoughnut
              data={{
                labels: ['Pengeluaran', 'Sisa Pemasukan'],
                datasets: [
                  {
                    label: 'Rasio',
                    data: [ratio.data?.expense_percentage ?? 0, ratio.data?.income_percentage ?? 0],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: `Periode ${periode}`,
                  },
                  subtitle: {
                    display: true,
                    text: 'Rasio (%)',
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.raw as string
                        return `${context.dataset.label}: ${value}%`
                      },
                    },
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={8}>
        <CCard>
          <CCardBody>
            <h5>Efesiensi Anggaran</h5>
            <CChartBar
              data={{
                labels: labelEffeciencies,
                datasets: [
                  {
                    label: 'Efesiensi anggaran',
                    data: Object.values(budgetEffeciency.data ?? {}).map((item: any) =>
                      Math.round(item)
                    ),
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.raw as string
                        return `${context.dataset.label}: ${value}%`
                      },
                    },
                  },
                  title: {
                    display: true,
                    text: `Periode ${periode}`,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Jumlah (%)', // Label untuk sumbu Y
                    },
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = ({ dashboardApp }) => {
  return {
    dateRanges: dashboardApp.dateRanges,
    ratio: dashboardApp.ratio,
    budgetEffeciency: dashboardApp.budgetEffeciency,
  }
}

export default connect(mapStateToProps, {
  loadRatioAction: loadRatio,
  loadBudgetEffeciencyAction: loadBudgetEffeciency,
})(FinanceIndicator)
