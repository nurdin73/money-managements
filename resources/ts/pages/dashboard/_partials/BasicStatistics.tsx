import { CCol, CRow, CWidgetStatsB } from '@coreui/react'
import React from 'react'

function BasicStatistics() {
  return (
    <CRow className='mb-4'>
      <CCol md={3}>
        <CWidgetStatsB text='Jumlah pemasukkan' title='Pemasukan' value='1000' />
      </CCol>
      <CCol md={3}>
        <CWidgetStatsB text='Jumlah anggaran' title='Total Anggaran' value='1000' />
      </CCol>
      <CCol md={3}>
        <CWidgetStatsB text='Jumlah pengeluaran' title='Total Pengeluaran' value='1000' />
      </CCol>
      <CCol md={3}>
        <CWidgetStatsB text='Sisa anggaran' title='Sisa Anggaran' value='1000' />
      </CCol>
    </CRow>
  )
}

export default BasicStatistics
