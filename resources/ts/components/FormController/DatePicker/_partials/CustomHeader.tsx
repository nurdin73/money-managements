import { range } from '@/helpers/date'
import { CButton, CFormSelect } from '@coreui/react'
import React from 'react'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { getYear } from 'react-datepicker/dist/date_utils'
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs'

function CustomHeader(props: ReactDatePickerCustomHeaderProps) {
  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    decreaseYear,
    increaseMonth,
    increaseYear,
    prevMonthButtonDisabled,
    prevYearButtonDisabled,
    nextMonthButtonDisabled,
    nextYearButtonDisabled,
  } = props

  const years = range(1990, new Date().getFullYear() + 1)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <>
      <h3 className='fs-3'>
        {months[date.getMonth()]} {date.getFullYear()}
      </h3>
      <div className='d-flex my-2 justify-content-between align-items-center gap-2'>
        <div className='d-flex justify-content-start align-items-center'>
          <CButton
            type='button'
            size='sm'
            disabled={prevYearButtonDisabled}
            onClick={decreaseYear}
            title='prev-year'
          >
            <BsChevronDoubleLeft />
          </CButton>
          <CButton
            type='button'
            size='sm'
            disabled={prevMonthButtonDisabled}
            onClick={decreaseMonth}
            title='prev-month'
          >
            <BsChevronLeft />
          </CButton>
        </div>
        <CFormSelect
          size='sm'
          value={date.getMonth() + 1}
          options={months.map((month, idx) => ({
            label: month,
            value: (idx + 1).toString(),
          }))}
          onChange={(e) => {
            changeMonth(Number(e.target.value))
          }}
        />
        <CFormSelect
          size='sm'
          options={years.map((year) => ({
            label: year.toString(),
            value: year.toString(),
          }))}
          value={date.getFullYear()}
          onChange={(e) => {
            changeYear(Number(e.target.value))
          }}
        />
        <div className='d-flex justify-content-end align-items-center'>
          <CButton
            size='sm'
            type='button'
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            title='next-month'
          >
            <BsChevronRight />
          </CButton>
          <CButton
            size='sm'
            type='button'
            onClick={increaseYear}
            disabled={nextYearButtonDisabled}
            title='next-year'
          >
            <BsChevronDoubleRight />
          </CButton>
        </div>
      </div>
    </>
  )
}

// export default React.memo(CustomHeader)
export default CustomHeader
