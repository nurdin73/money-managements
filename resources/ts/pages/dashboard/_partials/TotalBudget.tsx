import { CCard, CCardBody } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import React from 'react'

function TotalBudget() {
  return (
    <CCard className='h-100'>
      <CCardBody>
        <h5>Budget</h5>
        <span>Periode ......</span>
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

export default TotalBudget
