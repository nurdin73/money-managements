import React from 'react'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap'

import { KTIcon } from '@/_metronic/helpers'

import { TMeta } from '../../TableView/Table.type'
import { limits } from '../constants'
import PageItems from './PageItems'
interface IPagination {
    meta?: TMeta
    onChangePage: (page) => void
    onChangeLimit: (limit: number) => void
}

function Pagination({ meta, onChangePage, onChangeLimit }: IPagination) {
    const [limit, setLimit] = React.useState(10)
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <span>
                Menampilkan <b>{meta?.firstItem}</b> sampai <b>{meta?.lastItem}</b> dari{' '}
                <b>{meta?.totalData}</b> data
            </span>
            <div className='d-flex justify-content-end align-items-center gap-4'>
                <div className='d-flex align-items-center me-2 gap-2'>
                    <span>Show</span>
                    <UncontrolledDropdown
                        // isOpen={showLimit}
                        // toggle={() => setShowLimit(!showLimit)}
                        direction='down'
                        size='sm'
                    >
                        <DropdownToggle
                            style={{
                                padding: '5px 10px',
                            }}
                        >
                            <KTIcon iconName='down' iconType='outline' />
                            <span className='ml-2'>{limit}</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            {limits.map((l) => (
                                <DropdownItem
                                    key={l}
                                    onClick={() => {
                                        setLimit(l)
                                        if (onChangeLimit) {
                                            onChangeLimit(l)
                                        }
                                    }}
                                >
                                    {l}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                <PageItems
                    total={meta?.totalPage ?? 1}
                    currentPage={meta?.page ?? 1}
                    onChangePage={onChangePage}
                />
            </div>
        </div>
    )
}

export default Pagination
