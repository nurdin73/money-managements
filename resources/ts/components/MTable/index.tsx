import React from 'react'

import './styles.css'
import { useNavigate } from 'react-router-dom'

import ColumnFilter from './partials/ColumnFilter'
import Pagination from './partials/Pagination'
import MTableHeader from './MTableHeader'
import MTableBody from './MTableBody'
import { IColumns, IFilters, TAction, TMeta } from './types'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CTable } from '@coreui/react'

interface TMTable {
  columns: IColumns<any>[]
  actions?: TAction[]
  data: any[]
  meta?: TMeta
  title: string
  loading: boolean
  filters?: IFilters
  showButtonBack?: boolean
  showCheckbox?: boolean
  additionalActions?: TAction[]
  onSort: (order: string, sort: 'asc' | 'desc') => void
  onSearch?: (search: string) => void
  onMultiSearch?: (key: string, value: string) => void
  onSearchFields?: (key: string, value: string) => void
  onChangePage: (page) => void
  onCreate: () => void
  onChangeLimit: (limit) => void
  onHandlerSelected?: (selecteds: any[]) => void
}

const MTable = ({
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
  onSearchFields,
  showCheckbox,
  onHandlerSelected,
}: TMTable) => {
  const navigate = useNavigate()
  const [hiddenColumns, setHiddenColumns] = React.useState<any[]>([])
  const [selected, setSelected] = React.useState<any[]>([])
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
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

  const onSelectedItem = React.useCallback((id) => {
    setSelected((state: any) => {
      const findIndex = state.findIndex((i) => i === id)
      if (findIndex != -1) {
        state.splice(findIndex, 1)
        return state
      }
      state.push(id)
      return state
    })
    forceUpdate()
  }, [])

  const onSelectedAll = React.useCallback(
    (checked: boolean) => {
      if (checked) {
        const mappingIds = data.map((item) => item.id)
        console.log(mappingIds)
        setSelected(mappingIds)
        forceUpdate()
        return
      }
      setSelected([])
      forceUpdate()
      return
    },
    [data]
  )

  return (
    <CCard className='shadow-none'>
      <CCardHeader className='d-flex justify-content-between align-items-center p-3'>
        <div className='d-flex align-items-center justify-content-start gap-4'>
          {showButtonBack && <CButton onClick={() => navigate(-1)}>Kembali</CButton>}
          <span className='fs-4 fw-bold mb-0'>{title}</span>
        </div>
        <div className='d-flex justify-content-end gap-2'>
          {selected.length > 0 && onHandlerSelected && (
            <CButton onClick={() => onHandlerSelected(selected)} color='danger'>
              [{selected.length}] Item Selected
            </CButton>
          )}
          <ColumnFilter columns={columns} hiddenColumns={hiddenColumns} onChange={onFilterColumn} />
          {additionalActions &&
            additionalActions.map((action) => (
              <CButton
                key={action.title}
                color='secondary'
                size='lg'
                onClick={() => action.onClick()}
              >
                {action.title}
              </CButton>
            ))}
          <CButton color='primary' onClick={onCreate}>
            Tambah Data
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody className='p-0'>
        <CTable align='middle' responsive className='mb-0'>
          <MTableHeader
            selectedAll={selected.length === data.length}
            showCheckbox={showCheckbox}
            onSelectedAll={onSelectedAll}
            actions={actions}
            columns={columnFilters}
            filters={filters}
            onMultiSearch={onMultiSearch}
            onSort={onSort}
            onSearchFields={onSearchFields}
          />
          <MTableBody
            selected={selected}
            onSelectedItem={onSelectedItem}
            showCheckbox={showCheckbox}
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

export default MTable
