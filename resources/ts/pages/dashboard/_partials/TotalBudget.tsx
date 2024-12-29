import { loadBudgetSummary } from '@/redux/actions'
import { CCard, CCardBody } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import dayjs from 'dayjs'
import React from 'react'
import { connect } from 'react-redux'
import { Chart, Colors } from 'chart.js'
import { stringFormatter } from '@/helpers/string'

Chart.register(Colors)

function TotalBudget({ dateRanges, loadBudgetSummaryAction, budgetSummary }) {
  const { data } = budgetSummary

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

      loadBudgetSummaryAction({
        start_periode: startDate,
        end_periode: endDate,
      })
    }
  }, [dateRanges.endDate])

  const colors = Object.values(data ?? {}).map((item: any) => item.color)
  const dataset = Object.values(data ?? {}).map((item: any) => item.total)

  return (
    <CCard className='h-100'>
      <CCardBody>
        <h5>Budget</h5>
        <CChartDoughnut
          data={{
            labels: data ? Object.keys(data) : [],
            datasets: [
              {
                label: 'Budget summary',
                data: dataset,
                backgroundColor: colors,
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
                    const formattedValue = stringFormatter().numberFormat(value)
                    return `${context.dataset.label}: ${formattedValue}`
                  },
                },
              },
              title: {
                display: true,
                text: `Periode ${periode}`,
              },
            },
          }}
        />
      </CCardBody>
    </CCard>
  )
}

const mapStateToProps = ({ dashboardApp }) => {
  return {
    dateRanges: dashboardApp.dateRanges,
    budgetSummary: dashboardApp.budgetSummary,
  }
}

export default connect(mapStateToProps, {
  loadBudgetSummaryAction: loadBudgetSummary,
})(TotalBudget)
