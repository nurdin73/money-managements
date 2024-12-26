import DateRangePicker from '@/components/DateRangePicker'
import { cilCloudDownload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React from 'react'
import { connect } from 'react-redux'

function HeaderDashboard({ user }) {
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())

  const handleChange = React.useCallback((dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }, [])

  return (
    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4'>
      <h4 className='mb-0 fw-bold'>Halo,{user?.name}</h4>
      <div className='d-flex gap-2'>
        <DateRangePicker startDate={startDate} endDate={endDate} onChange={handleChange} />
        <CButton color='primary' className='d-flex align-items-center gap-2'>
          <CIcon icon={cilCloudDownload} />
          <span>Export</span>
        </CButton>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authApp }) => {
  return {
    user: authApp?.currentUser ?? null,
  }
}

export default connect(mapStateToProps)(HeaderDashboard)
