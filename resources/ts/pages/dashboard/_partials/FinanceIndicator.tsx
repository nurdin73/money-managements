import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs'
import React from 'react'

function FinanceIndicator() {
  return (
    <CRow>
      <CCol sm={4}>
        <CCard className='h-100'>
          <CCardBody>
            <h5>Rasio Pengeluaran</h5>
            <span>Periode ......</span>
            <CChartDoughnut
              data={{
                labels: ['Pengeluaran', 'Sisa Pemasukan'],
                datasets: [
                  {
                    data: [70, 30],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={8}>
        <CCard>
          <CCardBody>
            <h5>Efesiensi Anggaran</h5>
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
      </CCol>
    </CRow>
  )
}

export default FinanceIndicator
