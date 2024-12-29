import DateRangePicker from '@/components/DateRangePicker'
import { setRangePeriod } from '@/redux/actions'
import { cilCloudDownload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React from 'react'
import { connect } from 'react-redux'

function HeaderDashboard({ user, setRangePeriodAction, dateRanges }) {
  const { startDate, endDate } = dateRanges
  const handleChange = React.useCallback((dates) => {
    const [start, end] = dates
    setRangePeriodAction({ startDate: start, endDate: end })
  }, [])

  return (
    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4'>
      <h4 className='mb-0 fw-bold'>Halo,{user?.name}</h4>
      <div className='d-flex gap-2'>
        <DateRangePicker startDate={startDate} endDate={endDate} onChange={handleChange} />
        {/* <CButton color='primary' className='d-flex align-items-center gap-2'>
          <CIcon icon={cilCloudDownload} />
          <span>Export</span>
        </CButton> */}
      </div>
    </div>
  )
}

const mapStateToProps = ({ authApp, dashboardApp }) => {
  return {
    user: authApp?.currentUser ?? null,
    dateRanges: dashboardApp.dateRanges,
  }
}

export default connect(mapStateToProps, {
  setRangePeriodAction: setRangePeriod,
})(HeaderDashboard)
