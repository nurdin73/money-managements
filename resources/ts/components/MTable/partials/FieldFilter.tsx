import React from 'react'
import { Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import dayjs from 'dayjs'
import ReactSelect from 'react-select'

import { IColumns } from '../../TableView/Table.type'

interface IFieldFilter {
    column: IColumns<any>
    onMultiSearch?: (key: string, value: string) => void
}

function FieldFilter({ column, onMultiSearch }: IFieldFilter) {
    const [date, setDate] = React.useState(null)
    const render = React.useCallback(() => {
        const fields = {
            input: (
                <Input
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
                    className='form-control'
                    format='DD/MM/YYYY'
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
                <Input
                    onChange={(e) => {
                        if (onMultiSearch) onMultiSearch(column.id, e.target.value)
                    }}
                    placeholder={`Masukkan ${column.label}`}
                />
            )
        }
        if (!fields[column.filters.type]) {
            return (
                <Input
                    onChange={(e) => {
                        if (onMultiSearch) onMultiSearch(column.id, e.target.value)
                    }}
                    placeholder={`Masukkan ${column.label}`}
                />
            )
        }
        return fields[column.filters?.type]
    }, [column, onMultiSearch, date])

    return <div className='mt-2'>{render()}</div>
}

export default FieldFilter
