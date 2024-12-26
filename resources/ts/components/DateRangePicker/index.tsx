import { cilCalendar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'
import DatePicker from 'react-datepicker'
import './style.css'
import CustomDay from './_partials/CustomDay'

interface DateRangePickerProps {
  startDate: Date
  endDate: Date
  onChange: (dates: any) => void
}
function DateRangePicker(props: DateRangePickerProps) {
  return (
    <DatePicker
      className='form-control w-100'
      selectsRange={true}
      startDate={props.startDate}
      endDate={props.endDate}
      onChange={props.onChange}
      showIcon
      icon={<CIcon icon={cilCalendar} />}
      monthsShown={2}
      showPopperArrow={false}
      isClearable
      renderDayContents={(day, date) => <CustomDay day={day} date={date} />}
    />
  )
}

export default DateRangePicker
