import clsx from 'clsx'
import React from 'react'

interface ITableCell {
  width?: string | number
  center?: boolean
  children: React.ReactNode
}

function TableCell({ width = '100%', center, children }: ITableCell) {
  return (
    <td
      className={clsx('align-middle', {
        'd-flex justify-content-center align-items-center text-center': center,
      })}
      style={{ width }}
    >
      {children}
    </td>
  )
}

export default TableCell
