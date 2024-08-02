import React, { useContext } from 'react'

import { QTableContext } from '../QTable.provider'
import { IFilters } from '../../TableView/Table.type'

const useQtableHook = () => {
    const [filters, setFilters] = React.useState<IFilters>({
        orderBy: 'id',
        sortedBy: 'desc',
    })
    const [multiSearch, setMultiSearch] = React.useState({})

    const state = useContext(QTableContext)

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const objArray = Object.keys(multiSearch)
            if (objArray.length === 0) return
            const searchs = objArray
                .filter((obj) => multiSearch[obj] !== undefined && multiSearch[obj] !== '')
                .map((obj) => `${obj}:${multiSearch[obj]}`)
                .join(';')
            setFilters((filter) => ({
                ...filter,
                search: searchs !== '' ? searchs : undefined,
                searchJoin: searchs !== '' ? 'and' : undefined,
                page: 1,
            }))
        }, 1000)
        return () => clearTimeout(timeout)
    }, [multiSearch])

    if (!state) throw new Error('useQtableHook must inside QTableProvider')

    const onSort = React.useCallback((order, sort) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            orderBy: order,
            sortedBy: sort,
            page: 1,
        }))
    }, [])
    const onSearch = React.useCallback((search: string) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            search,
            page: 1,
        }))
    }, [])
    const onChangePage = React.useCallback((page) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            page,
        }))
    }, [])
    const onChangeLimit = React.useCallback((limit) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            limit,
            page: 1,
        }))
    }, [])

    const onMultiSearch = React.useCallback((key: string, value: string) => {
        setMultiSearch((prev) => ({
            ...prev,
            [key]: value,
        }))
    }, [])

    return {
        ...state,
        filters,
        onSearch,
        onChangeLimit,
        onChangePage,
        onSort,
        onMultiSearch,
    }
}

export default useQtableHook
