import { stringFormatter } from '@/helpers/string'
import { CSpinner } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import React from 'react'
import { connect } from 'react-redux'

function StatisticPerDays({ transactionIncomeExpensesApp }) {
  const { report } = transactionIncomeExpensesApp

  const getDays = React.useMemo(() => {
    if (report.data?.days) {
      return Object.keys(report.data.days)
    }
    return []
  }, [report])

  if (report.loading) {
    return (
      <div className='d-flex justify-content-center'>
        <CSpinner />
      </div>
    )
  }

  return (
    <CChartBar
      data={{
        labels: getDays,
        datasets: [
          {
            label: 'Pemasukan',
            backgroundColor: 'rgba(0, 123, 255, 0.9)',
            data: getDays.map((day) => report.data.days[day].income),
          },
          {
            label: 'Pengeluaran',
            backgroundColor: 'rgba(255, 193, 7, 0.9)',
            data: getDays.map((day) => report.data.days[day].expense),
          },
          {
            label: 'Profit',
            backgroundColor: 'rgba(40, 167, 69, 0.9)',
            data: getDays.map((day) => report.data.days[day].profit),
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
        },
      }}
    />
  )
}

const mapStateToProps = ({ transactionIncomeExpensesApp }) => {
  return {
    transactionIncomeExpensesApp,
  }
}

export default connect(mapStateToProps)(StatisticPerDays)
