const PaginationEllipsis = () => (
    <div>
        {Array(3)
            .fill({})
            .map((_, idx) => (
                <span key={idx}>.</span>
            ))}
    </div>
)

// export const PaginationEllipsis = memo(PaginationEllipsisMemo)
export default PaginationEllipsis
