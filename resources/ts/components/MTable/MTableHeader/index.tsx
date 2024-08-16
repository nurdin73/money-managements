import React from 'react'

import Column from '../partials/Column'
import { IColumns, IFilters, TAction } from '../types'
import clsx from 'clsx'
import { CFormCheck, CTableHead, CTableHeaderCell } from '@coreui/react'

interface IMTableHeader {
  actions?: TAction[]
  columns: IColumns<any>[]
  filters?: IFilters
  showCheckbox?: boolean
  onSort: (order: string, sort: 'asc' | 'desc') => void
  onMultiSearch?: (key: string, value: string) => void
  onSearchFields?: (key: string, value: string) => void
}

function MTableHeader({
  actions,
  columns,
  filters,
  onSort,
  onMultiSearch,
  onSearchFields,
  showCheckbox,
}: IMTableHeader) {
  return (
    <CTableHead
      className='fs-6'
      style={{
        position: 'sticky',
        top: 0,
        borderTop: '2px solid var(--cui-border-color)',
        borderBottom: '2px solid var(--cui-border-color)',
      }}
    >
      {showCheckbox && (
        <CTableHeaderCell
          className='px-2'
          style={{
            position: 'sticky',
            left: 0,
            width: 20,
            verticalAlign: 'baseline',
            backgroundColor: 'var(--cui-body-bg)',
          }}
        >
          #
        </CTableHeaderCell>
      )}
      {actions && (
        <CTableHeaderCell
          className='text-center fw-bolder'
          style={{
            position: 'sticky',
            left: showCheckbox ? 20 : 0,
            verticalAlign: 'baseline',
            width: 20,
            backgroundColor: 'var(--cui-body-bg)',
          }}
        >
          Actions
        </CTableHeaderCell>
      )}
      {columns.map((col, idx) => (
        <CTableHeaderCell
          key={col.id}
          style={{
            width: col.width ?? 100,
            // borderBottom: '1px solid #ccc',
            // borderRight: '1px solid #ccc',
            // borderLeft: '1px solid #ccc',
            verticalAlign: 'baseline',
            left: 145,
          }}
          className={clsx('text-dark fw-bolder', { 'position-sticky': col.fixed })}
        >
          <Column
            index={idx}
            onSort={onSort}
            col={col}
            filters={filters}
            onMultiSearch={onMultiSearch}
            onSearchFields={onSearchFields}
          />
        </CTableHeaderCell>
      ))}
    </CTableHead>
  )
}

export default MTableHeader
