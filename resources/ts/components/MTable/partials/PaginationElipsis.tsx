import { CPaginationItem } from '@coreui/react'

const PaginationEllipsis = () => (
  <CPaginationItem as='a'>
    {Array(3)
      .fill({})
      .map((_, idx) => (
        <span key={idx}>.</span>
      ))}
  </CPaginationItem>
)

// export const PaginationEllipsis = memo(PaginationEllipsisMemo)
export default PaginationEllipsis
