import { CCard, CCardBody } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import React from 'react'

function IncomeExpenseLatest() {
  return (
    <CCard className='mt-4'>
      <CCardBody>
        <h5>Pemasukkan dan pengeluaran</h5>
        <span>Periode ......</span>
        <CChartBar
          data={{
            labels: [
              '2024-01-01',
              '2024-01-02',
              '2024-01-03',
              '2024-01-04',
              '2024-01-05',
              '2024-01-06',
              '2024-01-07',
            ],
            datasets: [
              {
                label: 'Pemasukkan',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40],
              },
              {
                label: 'Pengeluaran',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 86, 27, 90],
              },
            ],
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default IncomeExpenseLatest
