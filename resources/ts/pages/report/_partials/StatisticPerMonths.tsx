import { stringFormatter } from '@/helpers/string'
import { CSpinner } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import React from 'react'
import { connect } from 'react-redux'

function StatisticPerMonths({ transactionIncomeExpensesApp }) {
  const { report } = transactionIncomeExpensesApp

  const getMonths = React.useMemo(() => {
    if (report.data?.months) {
      return Object.keys(report.data.months)
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
        labels: getMonths,
        datasets: [
          {
            label: 'Pemasukan',
            backgroundColor: 'rgba(0, 123, 255, 0.9)',
            data: getMonths.map((month) => report.data.months[month].income),
          },
          {
            label: 'Pengeluaran',
            backgroundColor: 'rgba(255, 193, 7, 0.9)',
            data: getMonths.map((month) => report.data.months[month].expense),
          },
          {
            label: 'Profit',
            backgroundColor: 'rgba(40, 167, 69, 0.9)',
            data: getMonths.map((month) => report.data.months[month].profit),
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

export default connect(mapStateToProps)(StatisticPerMonths)
