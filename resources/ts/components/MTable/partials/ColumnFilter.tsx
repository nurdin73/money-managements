import React from 'react'
import { PopoverBody, PopoverHeader, UncontrolledPopover } from 'reactstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'

import { Button } from '../../Buttons/Button'
import { IColumns } from '../../TableView/Table.type'

interface IColumnFilter {
    columns: IColumns<any>[]
    hiddenColumns: any[]
    onChange: (col) => void
}

function ColumnFilter({ columns, hiddenColumns, onChange }: IColumnFilter) {
    return (
        <>
            <Button
                label='Column Filter'
                variant='secondary'
                size='lg'
                type='icon'
                role='button'
                id='popover1'
                iconName='eye'
                iconType='solid'
            />
            <UncontrolledPopover placement='left-start' target='popover1'>
                <PopoverHeader>Filter Columns</PopoverHeader>
                <PopoverBody
                    style={{
                        width: 200,
                    }}
                >
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
                </PopoverBody>
            </UncontrolledPopover>
        </>
    )
}

export default ColumnFilter
