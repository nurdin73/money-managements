export type TOptions = {
  label: string
  value: any
}

export interface IColumns<T> {
  id: string
  width?: string
  label: any
  filters?: {
    type: 'select' | 'input' | 'date'
    options?: TOptions[]
  }
  center?: boolean
  sort?: boolean
  render?: (data: T) => any
}

export interface ITable {
  data: any
  loading: boolean
  column: IColumns<any>[]
  isCheckbox?: boolean
  enableSort?: boolean
  disableSortField?: any[]
}

export type TAction = {
  iconName: string
  variant: 'primary' | 'secondary' | 'danger'
  iconColor?: string
  onClick: (data?: any) => void
  title?: string
}

export type TMeta = {
  page: number
  perPage: number
  total: number
  totalData: number
  totalPage: number
  firstItem: number
  lastItem: number
}

export interface IFilters {
  sortedBy?: 'asc' | 'desc'
  orderBy?: string
  search?: string
  page?: number
  limit?: number
}