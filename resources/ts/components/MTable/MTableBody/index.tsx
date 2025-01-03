import React from 'react'
import NotfoundData from '../partials/NotfoundData'
import { IColumns, TAction, TMeta } from '../types'
import TableCell from '../partials/TableCell'
import { CButton, CFormCheck, CPlaceholder, CTableDataCell } from '@coreui/react'

interface IMTableBody {
  actions?: TAction[]
  data: any[]
  loading: boolean
  columns: IColumns<any>[]
  meta?: TMeta
  selected?: any[]
  onSelectedItem: (id) => void
  showCheckbox?: boolean
}

function MTableBody({
  actions,
  loading,
  data,
  columns,
  meta,
  showCheckbox,
  selected,
  onSelectedItem,
}: IMTableBody) {
  const startIndex = ((meta?.page ?? 1) - 1) * (meta?.perPage ?? 10) + 1
  return (
    <tbody>
      {loading &&
        Array(10)
          .fill({})
          .map((_, idx) => (
            <tr key={`loading-${idx}-${_}`}>
              {showCheckbox && (
                <td key={`load-${idx}-checkbox`}>
                  <CPlaceholder animation='glow' className='d-block'>
                    <CPlaceholder className='d-block' />
                  </CPlaceholder>
                </td>
              )}
              {actions && (
                <td key={`load-${idx}-action`}>
                  <CPlaceholder animation='glow' className='d-block'>
                    <CPlaceholder className='d-block' />
                  </CPlaceholder>
                </td>
              )}
              {columns.map((col) => (
                <td key={`load-${idx}-${col.id}`}>
                  <CPlaceholder animation='glow' className='d-block'>
                    <CPlaceholder className='d-block' />
                  </CPlaceholder>
                </td>
              ))}
            </tr>
          ))}
      {data?.length === 0 && !loading && (
        <tr>
          <CTableDataCell
            colSpan={columns.length + (actions ? 1 : 0) + (showCheckbox ? 1 : 0)}
            className='text-center'
          >
            <NotfoundData message='Data tidak ditemukan' />
          </CTableDataCell>
        </tr>
      )}
      {!loading &&
        data?.map((item, idx) => (
          <tr
            key={`item-${item.id}`}
            // style={{
            //     borderBottom: '2px dashed #ccc',
            // }}
          >
            {showCheckbox && (
              <CTableDataCell
                className='px-2'
                style={{
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'var(--cui-body-bg)',
                }}
              >
                <CFormCheck
                  name={`selected-${item.id}`}
                  checked={selected?.some((select) => select === item.id)}
                  onChange={() => onSelectedItem(item.id)}
                />
              </CTableDataCell>
            )}
            {actions && (
              <CTableDataCell
                style={{
                  width: 150,
                  position: 'sticky',
                  left: showCheckbox ? 20 : 0,
                  backgroundColor: 'var(--cui-body-bg)',
                }}
              >
                <div className='d-flex gap-2'>
                  {actions
                    .filter((action) => {
                      if (action.isShow) {
                        return action.isShow(item)
                      }
                      return true
                    })
                    .map((a) => (
                      <CButton size='sm' color={a.variant} onClick={() => a.onClick(item)}>
                        {a.title}
                      </CButton>
                    ))}
                </div>
              </CTableDataCell>
            )}
            {columns?.map((col) => {
              if (col.render)
                return (
                  <TableCell
                    fixed={col.fixed}
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
                    fixed={col.fixed}
                    center={col.center}
                    key={`item-${item.id}-${col.id}`}
                    width={col?.width}
                  >
                    {startIndex + idx}
                  </TableCell>
                )
              return (
                <TableCell
                  fixed={col.fixed}
                  key={`item-${item.id}-${col.id}`}
                  center={col.center}
                  width={col?.width}
                >
                  {item[col.id]}
                </TableCell>
              )
            })}
          </tr>
        ))}
    </tbody>
  )
}

export default MTableBody
