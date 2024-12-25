import { stringFormatter } from '@/helpers/string'
import { CSpinner } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import React from 'react'
import { connect } from 'react-redux'

function StatisticPerYears({ transactionIncomeExpensesApp }) {
  const { report } = transactionIncomeExpensesApp

  const getYears = React.useMemo(() => {
    if (report.data?.years) {
      return Object.keys(report.data.years)
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
        labels: getYears,
        datasets: [
          {
            label: 'Pemasukan',
            backgroundColor: 'rgba(0, 123, 255, 0.9)',
            data: getYears.map((year) => report.data.years[year].income),
          },
          {
            label: 'Pengeluaran',
            backgroundColor: 'rgba(255, 193, 7, 0.9)',
            data: getYears.map((year) => report.data.years[year].expense),
          },
          {
            label: 'Profit',
            backgroundColor: 'rgba(40, 167, 69, 0.9)',
            data: getYears.map((year) => report.data.years[year].profit),
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
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Jumlah (Rupiah)', // Label untuk sumbu Y
            },
            ticks: {
              callback: (value) => stringFormatter().numberFormat(value),
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

export default connect(mapStateToProps)(StatisticPerYears)
