import React from 'react'
import { CButton, CFormSwitch, CPopover } from '@coreui/react'
import { IColumns } from '../types'

interface IColumnFilter {
  columns: IColumns<any>[]
  hiddenColumns: any[]
  onChange: (col) => void
}

function ColumnFilter({ columns, hiddenColumns, onChange }: IColumnFilter) {
  return (
    <CPopover
      title='Filter Columns'
      fallbackPlacements='left-start'
      content={
        <ul className='list-unstyled d-flex flex-column gap-2'>
          {columns.map((col) => (
            <li key={col.id} className='d-flex align-items-center gap-2'>
              <CFormSwitch
                size='xl'
                label={col.label}
                defaultChecked={!hiddenColumns.some((hiddenCol) => hiddenCol === col.id)}
                onChange={() => onChange(col.id)}
              />
            </li>
          ))}
        </ul>
      }
    >
      <CButton color='secondary'>Column Filter</CButton>
    </CPopover>
  )
}

export default ColumnFilter
