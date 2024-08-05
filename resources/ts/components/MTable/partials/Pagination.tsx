import React from 'react'

import { TMeta } from '../types'
import { limits } from '../constants'
import PageItems from './PageItems'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronCircleDownAlt } from '@coreui/icons'
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
          <CDropdown
            // isOpen={showLimit}
            // toggle={() => setShowLimit(!showLimit)}
            direction='dropend'
          >
            <CDropdownToggle
              style={{
                padding: '5px 10px',
              }}
              variant='outline'
              color='primary'
            >
              {limit}
            </CDropdownToggle>
            <CDropdownMenu>
              {limits.map((l) => (
                <CDropdownItem
                  key={l}
                  onClick={() => {
                    setLimit(l)
                    if (onChangeLimit) {
                      onChangeLimit(l)
                    }
                  }}
                >
                  {l}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
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
