import React from 'react'
import { CFormInput, CFormSelect } from '@coreui/react'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import ReactSelect from 'react-select'
import '@/components/FormController/DatePicker/style.css'

import { IColumns } from '../types'

interface IFieldFilter {
  column: IColumns<any>
  onMultiSearch?: (key: string, value: string) => void
  onSearchFields?: (key: string, value: string) => void
}

function FieldFilter({ column, onMultiSearch, onSearchFields }: IFieldFilter) {
  const [date, setDate] = React.useState<any>(null)
  const render = React.useCallback(() => {
    const fields = {
      input: (
        <CFormInput
          onChange={(e) => {
            if (onMultiSearch) onMultiSearch(column.id, e.target.value)
          }}
          placeholder={`Masukkan ${column.label}`}
        />
      ),
      date: (
        <DatePicker
          selected={date}
          onChange={(d) => {
            setDate(d)
            if (!d) {
              if (onMultiSearch) onMultiSearch(column.id, '')
              return
            }
            const value = dayjs(d).format('YYYY-MM-DD')
            if (onMultiSearch) {
              onMultiSearch(column.id, value)
            }
          }}
          showPopperArrow={false}
          className='form-control'
          dateFormat='dd/MM/yyyy'
          isClearable
          placeholderText={`Pilih ${column.label}`}
        />
      ),
      select: (
        <ReactSelect
          options={column.filters?.options ?? []}
          onChange={(val) => {
            if (onMultiSearch) onMultiSearch(column.id, val?.value)
          }}
          isClearable
        />
      ),
    }
    if (!column.filters) {
      return (
        <CFormInput
          onChange={(e) => {
            if (onMultiSearch) onMultiSearch(column.id, e.target.value)
          }}
          placeholder={`Masukkan ${column.label}`}
        />
      )
    }
    if (!fields[column.filters.type]) {
      return (
        <CFormInput
          onChange={(e) => {
            if (onMultiSearch) onMultiSearch(column.id, e.target.value)
          }}
          placeholder={`Masukkan ${column.label}`}
        />
      )
    }
    return fields[column.filters?.type]
  }, [column, onMultiSearch, date])

  return (
    <div className='mt-2'>
      {onSearchFields && (
        <CFormSelect
          className='mb-2'
          options={[
            {
              label: 'Pilih',
              value: undefined,
            },
            {
              label: 'Contain',
              value: '=',
            },
            {
              label: 'Not',
              value: '!=',
            },
            {
              label: 'Like',
              value: 'ilike',
            },
          ]}
          onChange={(e) => {
            onSearchFields(column.id, e.target.value)
          }}
        />
      )}
      {render()}
    </div>
  )
}

export default FieldFilter
