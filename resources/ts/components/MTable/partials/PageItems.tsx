import React from 'react'

import PaginationEllipsis from '../../PaginationView/PaginationEllipsis'

interface IPageItems {
    total: number
    currentPage: number
    onChangePage: (page) => void
}

function renderButtons(total, currentPage, onChangePage) {
    const listPage = Array(Number(total))
        .fill({})
        .map((_, idx) => (
            <button
                key={idx}
                className={
                    idx + 1 == currentPage
                        ? 'synergy-pagination__page-button--active'
                        : 'synergy-pagination__page-button'
                }
                onClick={() => onChangePage(idx + 1)}
            >
                {idx + 1}
            </button>
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
            <button
                disabled={currentPage === 1}
                className={`synergy-pagination__page-button ${currentPage === 1 ? 'text-muted' : ''}`}
                onClick={() => onChangePage(currentPage - 1)}
                style={{
                    cursor: currentPage === 1 ? 'no-drop' : 'pointer',
                }}
            >
                Prev
            </button>
            <div className='synergy-pagination__button-list'>
                {renderButtons(total, currentPage, onChangePage)}
            </div>
            <button
                disabled={currentPage === total}
                className={`synergy-pagination__page-button ${currentPage === total ? 'text-muted' : ''}`}
                onClick={() => onChangePage(currentPage + 1)}
                style={{
                    cursor: currentPage === total ? 'no-drop' : 'pointer',
                }}
            >
                Next
            </button>
        </div>
    )
}

export default PageItems
