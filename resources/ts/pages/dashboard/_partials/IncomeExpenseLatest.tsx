import { stringFormatter } from '@/helpers/string'
import { loadLastTransaction } from '@/redux/actions'
import { CCard, CCardBody } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import dayjs from 'dayjs'
import React from 'react'
import { connect } from 'react-redux'

function IncomeExpenseLatest({ dateRanges, loadLastTransactionAction, lastTransactions }) {
  const { data } = lastTransactions
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

      loadLastTransactionAction({
        start_periode: startDate,
        end_periode: endDate,
      })
    }
  }, [dateRanges.endDate])

  const labels = Object.keys(data ?? {})

  const datasets = Object.values(data ?? {})

  return (
    <CCard className='mt-4'>
      <CCardBody>
        <h5>Pemasukkan dan pengeluaran</h5>
        <CChartBar
          data={{
            labels: labels,
            datasets: [
              {
                label: 'Pemasukkan',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: datasets.map((item: any) => item.income),
              },
              {
                label: 'Pengeluaran',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: datasets.map((item: any) => item.expense),
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
      </CCardBody>
    </CCard>
  )
}

const mapStateToProps = ({ dashboardApp }) => {
  return {
    dateRanges: dashboardApp.dateRanges,
    lastTransactions: dashboardApp.lastTransactions,
  }
}

export default connect(mapStateToProps, {
  loadLastTransactionAction: loadLastTransaction,
})(IncomeExpenseLatest)
