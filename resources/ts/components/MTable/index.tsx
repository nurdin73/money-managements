import React from 'react'

import './styles.css'
import { useNavigate } from 'react-router-dom'

import ColumnFilter from './partials/ColumnFilter'
import Pagination from './partials/Pagination'
import QTableHeader from './MTableHeader'
import QTableBody from './MTableBody'
import { IColumns, IFilters, TAction, TMeta } from './types'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CTable } from '@coreui/react'

interface TQTable {
    columns: IColumns<any>[]
    actions?: TAction[]
    data: any[]
    meta?: TMeta
    title: string
    loading: boolean
    filters?: IFilters
    showButtonBack?: boolean
    additionalActions?: TAction[]
    onSort: (order: string, sort: 'asc' | 'desc') => void
    onSearch?: (search: string) => void
    onMultiSearch?: (key: string, value: string) => void
    onChangePage: (page) => void
    onCreate: () => void
    onChangeLimit: (limit) => void
}

const QTable = ({
    columns,
    data,
    loading,
    meta,
    title,
    actions,
    onChangePage,
    onChangeLimit,
    onSort,
    filters,
    onMultiSearch,
    onCreate,
    showButtonBack,
    additionalActions,
}: TQTable) => {
    const navigate = useNavigate()
    const [hiddenColumns, setHiddenColumns] = React.useState<any[]>([])
    const columnFilters = React.useMemo(
        () => columns.filter((col) => !hiddenColumns.some((hidden) => hidden === col.id)),
        [hiddenColumns, columns]
    )

    const onFilterColumn = React.useCallback((col) => {
        setHiddenColumns((prev) => {
            if (prev.some((p) => p === col)) {
                return prev.filter((p) => p !== col)
            }
            return [...prev, col]
        })
    }, [])

    return (
        <CCard className='shadow-none'>
            <CCardHeader className='d-flex justify-content-between align-items-center p-3'>
                <div className='d-flex align-items-center justify-content-start gap-4'>
                    {showButtonBack && <CButton onClick={() => navigate(-1)}>Kembali</CButton>}
                    <h2 className='fs-2 fw-bold mb-0'>{title}</h2>
                </div>
                <div className='d-flex justify-content-end gap-2'>
                    <ColumnFilter
                        columns={columns}
                        hiddenColumns={hiddenColumns}
                        onChange={onFilterColumn}
                    />
                    {additionalActions &&
                        additionalActions.map((action) => (
                            <CButton key={action.title} onClick={() => action.onClick()}>
                                {action.title}
                            </CButton>
                            // <Button
                            //     role='button'
                            //     size='lg'
                            //     label={action.title}
                            //     variant={action.variant}
                            //     type='icon'
                            //     iconName={action.iconName}
                            //     iconType='duotone'
                            //     onClick={() => action.onClick()}
                            // />
                        ))}
                    <CButton onClick={onCreate}>Tambah Data</CButton>
                </div>
            </CCardHeader>
            <CCardBody className='p-0'>
                <CTable hover borderless className='table-row-dashed' responsive>
                    <QTableHeader
                        actions={actions}
                        columns={columnFilters}
                        filters={filters}
                        onMultiSearch={onMultiSearch}
                        onSort={onSort}
                    />
                    <QTableBody
                        meta={meta}
                        actions={actions}
                        columns={columnFilters}
                        data={data}
                        loading={loading}
                    />
                </CTable>
            </CCardBody>
            <CCardFooter className='p-3'>
                <Pagination meta={meta} onChangePage={onChangePage} onChangeLimit={onChangeLimit} />
            </CCardFooter>
        </CCard>
    )
}

export default QTable
