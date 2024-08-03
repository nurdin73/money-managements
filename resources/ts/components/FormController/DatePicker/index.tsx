import React from 'react'

import DatePicker from 'react-datepicker'
import CustomHeader from './_partials/CustomHeader'
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'

import './style.css'
import CustomDay from './_partials/CustomDay'
import dayjs from 'dayjs'

export default function DatePickerForm(props) {
  const [selected, setSelected] = React.useState<any>(null)
  return (
    <DatePicker
      {...props}
      selected={selected}
      onChange={(date) => {
        setSelected(date)
        props.onChange(dayjs(date).format(props.dateFormat))
      }}
      renderCustomHeader={CustomHeader}
      wrapperClassName='w-100'
      className={`form-control d-block w-100 form-control-${props.size}`}
      showIcon
      shouldCloseOnSelect
      popperPlacement='bottom-start'
      icon={<CIcon icon={cilCalendar} />}
      showPopperArrow={false}
      withPortal
      renderDayContents={(day, date) => <CustomDay day={day} date={date} />}
    />
  )
}
