import { stringFormatter } from '@/helpers/string'
import { loadExpenseDetail } from '@/redux/actions'
import { CCard, CCardBody } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import dayjs from 'dayjs'
import React from 'react'
import { connect } from 'react-redux'

function ExpenseDetails({ dateRanges, loadExpenseDetailAction, expenseDetail }) {
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

      loadExpenseDetailAction({
        start_periode: startDate,
        end_periode: endDate,
      })
    }
  }, [dateRanges.endDate])

  const labels = expenseDetail.data?.map((item) => item.name)
  const dataset = expenseDetail.data?.map((item) => item.total)

  return (
    <CCard>
      <CCardBody>
        <h5>Rincian Pengeluaran Terbanyak</h5>
        <CChartBar
          data={{
            labels: labels,
            datasets: [
              {
                label: 'Pengeluaran',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dataset,
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
    expenseDetail: dashboardApp.expenseDetail,
  }
}

export default connect(mapStateToProps, {
  loadExpenseDetailAction: loadExpenseDetail,
})(ExpenseDetails)
