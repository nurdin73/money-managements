import React from 'react'
import { CPopover } from '@coreui/react'

import { IColumns, IFilters } from '../types'
import FieldFilter from './FieldFilter'
import CIcon from '@coreui/icons-react'
import { cilFilter, cilSortAscending, cilSortDescending } from '@coreui/icons'

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
              <CIcon
                icon={
                  filters?.sortedBy === 'asc' && filters?.orderBy == col.id
                    ? cilSortAscending
                    : cilSortDescending
                }
              />
            </button>
          )}
          {col.filters && (
            <CPopover
              title={`Filter ${col.label}`}
              content={<FieldFilter column={col} onMultiSearch={onMultiSearch} />}
              placement='bottom'
            >
              <button
                type='button'
                title='filter'
                // onClick={() => setShowFilter(!showFilter)}
                id={`filter${index}`}
              >
                <CIcon icon={cilFilter} />
              </button>
            </CPopover>
          )}
        </div>
      </div>
      {/* {showFilter && <FieldFilter column={col} onMultiSearch={onMultiSearch} />} */}
    </div>
  )
}

export default Column
