import { CCard, CCardBody } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import dayjs from 'dayjs'
import React from 'react'
import { connect } from 'react-redux'

function TotalBudget({ dateRanges }) {
  const periode = React.useMemo(() => {
    const { startDate, endDate } = dateRanges
    return startDate
      ? `${dayjs(startDate).format('DD MMM YYYY')} - ${dayjs(endDate).format('DD MMM YYYY')}`
      : '-'
  }, [dateRanges])

  return (
    <CCard className='h-100'>
      <CCardBody>
        <h5>Budget</h5>
        <span>Periode {periode}</span>
        <CChartDoughnut
          data={{
            labels: ['Makanan', 'Transportasi', 'Hiburan', 'Belanja', 'Lainnya'],
            datasets: [
              {
                data: [300, 50, 100, 200, 150],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#63FF84', '#84FF63'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#63FF84', '#84FF63'],
              },
            ],
          }}
        />
      </CCardBody>
    </CCard>
  )
}

const mapStateToProps = ({ dashboardApp }) => {
  return {
    dateRanges: dashboardApp.dateRanges,
  }
}

export default connect(mapStateToProps)(TotalBudget)
