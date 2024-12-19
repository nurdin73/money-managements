import dayjs from 'dayjs'
import { CBadge as Badge, CBadge } from '@coreui/react'
import { IColumns } from '@/components/MTable/types'
import { stringFormatter } from '@/helpers/string'

export type TTransactionIncomeExpense = {
  name: any
  amount: any
  category: any
  created_at: any
}

export const getColumns = (): IColumns<TTransactionIncomeExpense>[] => [
  {
    label: 'Nama',
    id: 'name',
    filters: {
      type: 'input',
    },
  },
  {
    label: 'Jumlah',
    id: 'amount',
    filters: {
      type: 'input',
    },
    render: (data) => stringFormatter().numberFormat(data.amount),
  },
  {
    label: 'Jenis Pemasukkan',
    id: 'category',
    filters: {
      type: 'input',
    },
    render: (data) => {
      return <CBadge color='primary'>{data.category?.name}</CBadge>
    },
  },
  {
    label: 'Tanggal',
    id: 'created_at',
    render: (data) => dayjs(data.created_at).format('DD/MM/YYYY'),
    filters: {
      type: 'date',
    },
  },
]
