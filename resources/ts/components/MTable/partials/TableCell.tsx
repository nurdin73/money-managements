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
            className={clsx(
                '',
                center
                    ? 'd-flex justify-content-center align-items-center text-center align-middle'
                    : ''
            )}
            style={{ width }}
        >
            {children}
        </td>
    )
}

export default TableCell
