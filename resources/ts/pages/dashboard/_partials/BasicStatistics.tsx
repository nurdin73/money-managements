import { stringFormatter } from '@/helpers/string'
import { loadBasicStatistic } from '@/redux/actions'
import { CCol, CRow, CWidgetStatsB } from '@coreui/react'
import dayjs from 'dayjs'
import React from 'react'
import { connect } from 'react-redux'

function BasicStatistics({ loadBasicStatisticAction, basicStatistic, dateRanges }) {
  const { loading, data, error, message } = basicStatistic

  React.useEffect(() => {
    if (dateRanges.endDate) {
      const startDate = dayjs(dateRanges.startDate).format('YYYY-MM-DD')
      const endDate = dayjs(dateRanges.endDate).format('YYYY-MM-DD')

      loadBasicStatisticAction({
        start_periode: startDate,
        end_periode: endDate,
      })
    }
  }, [dateRanges.endDate])

  return (
    <CRow className='mb-4'>
      <CCol md={3}>
        <CWidgetStatsB
          text='Jumlah pemasukkan'
          title='Pemasukan'
          value={stringFormatter().numberFormat(data?.income ?? 0)}
        />
      </CCol>
      <CCol md={3}>
        <CWidgetStatsB
          text='Jumlah anggaran'
          title='Total Anggaran'
          value={stringFormatter().numberFormat(data?.budget ?? 0)}
        />
      </CCol>
      <CCol md={3}>
        <CWidgetStatsB
          text='Jumlah pengeluaran'
          title='Total Pengeluaran'
          value={stringFormatter().numberFormat(data?.expense ?? 0)}
        />
      </CCol>
      <CCol md={3}>
        <CWidgetStatsB
          text='Sisa anggaran'
          title='Sisa Anggaran'
          value={stringFormatter().numberFormat(data?.budgetSpace ?? 0)}
        />
      </CCol>
    </CRow>
  )
}

const mapStateToProps = ({ dashboardApp }) => {
  return {
    basicStatistic: dashboardApp.basicStatistic,
    dateRanges: dashboardApp.dateRanges,
  }
}

export default connect(mapStateToProps, {
  loadBasicStatisticAction: loadBasicStatistic,
})(BasicStatistics)
