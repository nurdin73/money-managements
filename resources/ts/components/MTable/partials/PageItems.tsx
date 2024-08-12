import React from 'react'
import PaginationEllipsis from './PaginationElipsis'
import { CButton, CPagination, CPaginationItem } from '@coreui/react'

interface IPageItems {
  total: number
  currentPage: number
  onChangePage: (page) => void
}

function renderButtons(total, currentPage, onChangePage) {
  const listPage = Array(Number(total))
    .fill({})
    .map((_, idx) => (
      <CPaginationItem
        key={idx}
        as='a'
        onClick={() => onChangePage(idx + 1)}
        disabled={idx + 1 === currentPage}
        color={idx + 1 === currentPage ? 'primary' : 'secondary'}
      >
        {idx + 1}
      </CPaginationItem>
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
    <CPagination align='end' className='mb-0'>
      <CPaginationItem
        as='a'
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        Prev
      </CPaginationItem>
      {renderButtons(total, currentPage, onChangePage)}
      <CPaginationItem
        as='a'
        disabled={currentPage === total}
        onClick={() => onChangePage(currentPage + 1)}
      >
        Next
      </CPaginationItem>
    </CPagination>
  )
}

export default PageItems
