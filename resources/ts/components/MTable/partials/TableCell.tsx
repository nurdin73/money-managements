import { CTableDataCell } from '@coreui/react'
import clsx from 'clsx'
import React from 'react'

interface ITableCell {
  width?: string | number
  center?: boolean
  fixed?: boolean
  children: React.ReactNode
}

function TableCell({ width = '100%', center, children, fixed }: ITableCell) {
  return (
    <CTableDataCell
      className={clsx('align-middle', {
        'd-flex justify-content-center align-items-center text-center': center,
        'position-sticky': fixed,
      })}
      style={{
        width,
        left: 145,
      }}
    >
      {children}
    </CTableDataCell>
  )
}

export default TableCell
