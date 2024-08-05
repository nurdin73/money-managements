import React from 'react'
import PaginationEllipsis from './PaginationElipsis'
import { CButton } from '@coreui/react'

interface IPageItems {
  total: number
  currentPage: number
  onChangePage: (page) => void
}

function renderButtons(total, currentPage, onChangePage) {
  const listPage = Array(Number(total))
    .fill({})
    .map((_, idx) => (
      <CButton
        key={idx}
        shape='rounded-pill'
        size='sm'
        disabled={idx + 1 === currentPage}
        onClick={() => onChangePage(idx + 1)}
        color={idx + 1 === currentPage ? 'primary' : 'secondary'}
      >
        {idx + 1}
      </CButton>
    ))
  if (total > 9) {
    if (currentPage > 6 && currentPage < total - 4) {
      return [
        listPage.slice(0, 1),
        <PaginationEllipsis />,
        listPage.slice(currentPage - 3, currentPage + 2),
        <PaginationEllipsis />,
        listPage.slice(-3),
      ]
    } else if (currentPage >= total - 5) {
      return [listPage.slice(0, 1), <PaginationEllipsis />, listPage.slice(-8)]
    } else {
      return [listPage.slice(0, 7), <PaginationEllipsis />, listPage.slice(-3)]
    }
  }
  return listPage
}

function PageItems({ total, currentPage, onChangePage }: IPageItems) {
  return (
    <div className='synergy-pagination__navigation'>
      <CButton
        size='sm'
        color='primary'
        shape='rounded-pill'
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        Prev
      </CButton>
      {renderButtons(total, currentPage, onChangePage)}
      <CButton
        size='sm'
        color='primary'
        shape='rounded-pill'
        disabled={currentPage === total}
        onClick={() => onChangePage(currentPage + 1)}
      >
        Next
      </CButton>
    </div>
  )
}

export default PageItems
