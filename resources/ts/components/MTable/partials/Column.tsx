import React from 'react'
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap'

import { KTIcon } from '@/_metronic/helpers'

import { IColumns, IFilters } from '../../TableView/Table.type'
import FieldFilter from './FieldFilter'

interface IColumnItem {
    col: IColumns<any>
    onSort: (id, sort) => void
    filters?: IFilters
    onMultiSearch?: (key: string, value: string) => void
    index: number
}

function Column({ col, onSort, filters, onMultiSearch, index }: IColumnItem) {
    const [showFilter, setShowFilter] = React.useState(false)
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center gap-2'>
                <span className='text-nowrap'>{col.label}</span>
                <div className='button-filter gap-2'>
                    {(col.sort ?? true) && col.id !== 'no' && (
                        <button
                            type='button'
                            title='sort'
                            onClick={() => {
                                onSort(col.id, filters?.sortedBy == 'asc' ? 'desc' : 'asc')
                            }}
                        >
                            <KTIcon
                                iconName='arrow-up-down'
                                // iconName={
                                //     filters?.orderBy === col.id
                                //         ? filters?.sortedBy === 'asc'
                                //             ? 'double-down'
                                //             : 'double-up'
                                //         : 'double-up'
                                // }
                                iconType='solid'
                            />
                        </button>
                    )}
                    {col.filters && (
                        <>
                            <button
                                type='button'
                                title='filter'
                                onClick={() => setShowFilter(!showFilter)}
                                id={`filter${index}`}
                            >
                                <KTIcon iconName='filter-tick' iconType='solid' />
                            </button>
                            <Popover
                                isOpen={showFilter}
                                toggle={() => setShowFilter(!showFilter)}
                                target={`filter${index}`}
                                placement='bottom-end'
                            >
                                <PopoverHeader className='fs-3'>Filter {col.label}</PopoverHeader>
                                <PopoverBody>
                                    <FieldFilter column={col} onMultiSearch={onMultiSearch} />
                                </PopoverBody>
                            </Popover>
                        </>
                    )}
                </div>
            </div>
            {/* {showFilter && <FieldFilter column={col} onMultiSearch={onMultiSearch} />} */}
        </div>
    )
}

export default Column
