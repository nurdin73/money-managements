import React, { useContext } from 'react'

import { MTableContext } from '../provider'
import { IFilters } from '../types'

const useMtableHook = () => {
  const [filters, setFilters] = React.useState<IFilters>({
    orderBy: 'id',
    sortedBy: 'desc',
  })
  const timeout: any = React.useRef()
  const [multiSearch, setMultiSearch] = React.useState({})
  const [multiSearchFields, setMultiSearchFields] = React.useState({})

  const state = useContext(MTableContext)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const objArray = Object.keys(multiSearch)
      if (objArray.length === 0) return
      const searchs = objArray
        .filter((obj) => multiSearch[obj] !== undefined && multiSearch[obj] !== '')
        .map((obj) => `${obj}:${multiSearch[obj]}`)
        .join(';')
      const objSearchFields = Object.keys(multiSearchFields)
      const searchFields = objSearchFields
        .filter((obj) => multiSearchFields[obj] !== undefined && multiSearchFields[obj] !== '')
        .map((obj) => `${obj}:${multiSearchFields[obj]}`)
        .join(';')
      setFilters((filter) => ({
        ...filter,
        search: searchs !== '' ? searchs : undefined,
        searchJoin: searchs !== '' ? 'and' : undefined,
        searchFields: searchFields != '' ? searchFields : undefined,
        page: 1,
      }))
    }, 1000)
    return () => clearTimeout(timeout)
  }, [multiSearch, multiSearchFields])

  if (!state) throw new Error('useMtableHook must inside QTableProvider')

  const onSort = React.useCallback((order, sort) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      orderBy: order,
      sortedBy: sort,
      page: 1,
    }))
  }, [])
  const onSearch = React.useCallback((search: string, by?: string[]) => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      let searchFields: string | undefined = undefined
      if (by) {
        searchFields = by.map((b) => `${b}:like`).join(';')
      }

      setFilters((prevFilter) => ({
        ...prevFilter,
        search,
        searchFields,
        searchJoin: 'or',
        page: 1,
      }))
    }, 1000)
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

  const onMultiSearchFields = React.useCallback((key: string, value: string) => {
    setMultiSearchFields((prev) => ({
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
    onMultiSearchFields,
  }
}

export default useMtableHook
