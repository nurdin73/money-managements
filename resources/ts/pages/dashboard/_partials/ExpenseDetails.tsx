import { CCard, CCardBody } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import React from 'react'

function ExpenseDetails() {
  return (
    <CCard>
      <CCardBody>
        <h5>Rincian Pengeluaran Terbanyak</h5>
        <span>Periode ......</span>
        <CChartBar
          data={{
            labels: ['Makanan', 'Transportasi', 'Hiburan', 'Belanja', 'Lainnya'],
            datasets: [
              {
                label: 'Pengeluaran',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56],
              },
            ],
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default ExpenseDetails
