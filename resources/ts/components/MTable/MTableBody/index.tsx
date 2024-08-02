import React from 'react'
import { Spinner } from 'reactstrap'
import clsx from 'clsx'

import NotfoundData from '../partials/NotfoundData'
import { Button } from '../../Buttons/Button'
import { IColumns, TAction, TMeta } from '../../TableView/Table.type'
import TableCell from '../partials/TableCell'
import Skeleton from '../../Skeleton'

interface IQTableBody {
    actions?: TAction[]
    data: any[]
    loading: boolean
    columns: IColumns<any>[]
    meta?: TMeta
}

function QTableBody({ actions, loading, data, columns, meta }: IQTableBody) {
    const startIndex = ((meta?.page ?? 1) - 1) * (meta?.perPage ?? 10) + 1
    return (
        <tbody>
            {loading &&
                Array(10)
                    .fill({})
                    .map((_, idx) => (
                        <tr key={`loading-${idx}-${_}`}>
                            {actions && (
                                <td key={`load-${idx}-action`}>
                                    <Skeleton />
                                </td>
                            )}
                            {columns.map((col) => (
                                <td key={`load-${idx}-${col.id}`}>
                                    <Skeleton />
                                </td>
                            ))}
                        </tr>
                    ))}
            {data?.length === 0 && !loading && (
                <tr>
                    <th colSpan={columns.length + (actions ? 1 : 0)} className='text-center'>
                        <NotfoundData message='Data tidak ditemukan' />
                    </th>
                </tr>
            )}
            {data?.map((item, idx) => (
                <tr
                    key={`item-${item.id}`}
                    // style={{
                    //     borderBottom: '2px dashed #ccc',
                    // }}
                >
                    {actions && (
                        <td
                            style={{
                                width: 100,
                                position: 'sticky',
                                left: 0,
                            }}
                            className='bg-light px-4'
                        >
                            <div className='d-flex gap-2'>
                                {actions.map((a) => (
                                    <Button
                                        type='icon'
                                        iconName={a.iconName}
                                        iconType='solid'
                                        onClick={() => a.onClick(item)}
                                        role='button'
                                        iconColor={a.iconColor}
                                        variant={a.variant}
                                        size='sm'
                                        title={a.title}
                                    />
                                ))}
                            </div>
                        </td>
                    )}
                    {columns?.map((col) => {
                        if (col.render)
                            return (
                                <TableCell
                                    key={`item-${item.id}-${col.id}`}
                                    center={col.center}
                                    width={col?.width}
                                >
                                    {col.render(item)}
                                </TableCell>
                            )
                        if (col.id === 'no')
                            return (
                                <TableCell
                                    center={col.center}
                                    key={`item-${item.id}-${col.id}`}
                                    width={col?.width}
                                >
                                    {startIndex + idx}
                                </TableCell>
                            )
                        return (
                            <TableCell
                                key={`item-${item.id}-${col.id}`}
                                center={col.center}
                                width={col?.width}
                            >
                                {item[col.id]}
                            </TableCell>
                        )
                    })}
                    {/* {columns?.map((col) => (
                        <td
                            key={`item-${item.id}-${col.id}`}
                            className={clsx(
                                'w-100',
                                col.center
                                    ? 'd-flex justify-content-center align-items-center text-center align-middle'
                                    : ''
                            )}
                        >
                            {col.render ? col.render(item) : item[col.id]}
                        </td>
                    ))} */}
                </tr>
            ))}
        </tbody>
    )
}

export default QTableBody
