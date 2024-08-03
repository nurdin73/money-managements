import React from 'react'
import { CButton, CPopover } from '@coreui/react'
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
            placement='left-start'
            content={
                <ul className='list-unstyled d-flex flex-column gap-4'>
                    {columns.map((col) => (
                        <li key={col.id} className='d-flex align-items-center gap-2'>
                            <div className='form-check form-switch'>
                                <input
                                    title='action'
                                    className='form-check-input'
                                    type='checkbox'
                                    role='switch'
                                    defaultChecked={
                                        !hiddenColumns.some((hiddenCol) => hiddenCol === col.id)
                                    }
                                    onChange={() => onChange(col.id)}
                                />
                            </div>
                            <label htmlFor={col.id} className='fw-bold'>
                                {col.label}
                            </label>
                        </li>
                    ))}
                </ul>
            }
        >
            <CButton>Column Filter</CButton>
        </CPopover>
    )
}

export default ColumnFilter
