import React from 'react'

import Column from '../partials/Column'
import { IColumns, IFilters, TAction } from '../types'
import clsx from 'clsx'

interface IMTableHeader {
  actions?: TAction[]
  columns: IColumns<any>[]
  filters?: IFilters
  onSort: (order: string, sort: 'asc' | 'desc') => void
  onMultiSearch?: (key: string, value: string) => void
}

function MTableHeader({ actions, columns, filters, onSort, onMultiSearch }: IMTableHeader) {
  return (
    <thead
      className='fs-6'
      style={{
        position: 'sticky',
        top: 0,
        borderTop: '2px solid var(--cui-border-color)',
        borderBottom: '2px solid var(--cui-border-color)',
      }}
    >
      {actions && (
        <th
          className='py-2 px-4 text-center fw-bolder'
          style={{
            position: 'sticky',
            left: 0,
            verticalAlign: 'baseline',
            width: 20,
            backgroundColor: 'var(--cui-body-bg)',
          }}
        >
          Actions
        </th>
      )}
      {columns.map((col, idx) => (
        <th
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
          />
        </th>
      ))}
    </thead>
  )
}

export default MTableHeader
