import dayjs from 'dayjs'
import { CBadge as Badge } from '@coreui/react'
import { IColumns } from '@/components/MTable/types'
import { stringFormatter } from '@/helpers/string'

export type TTransactionBudget = {
  name: any
  amount: any
  category: any
  created_at: any
  start_periode: any
  end_periode: any
}

export const getColumns = (): IColumns<TTransactionBudget>[] => [
  {
    label: 'Nama',
    id: 'name',
    filters: {
      type: 'input',
    },
  },
  {
    label: 'Sisa Anggaran',
    id: 'amount',
    filters: {
      type: 'input',
    },
    render: (data) => stringFormatter().numberFormat(data.amount),
  },
  {
    label: 'Jenis Anggaran',
    id: 'category.name',
    filters: {
      type: 'input',
    },
    sort: false,
    render: (data) => data.category?.name,
  },
  {
    label: 'Periode',
    id: 'periode',
    sort: false,
    render: (data) =>
      `${dayjs(data.start_periode).format('DD/MM/YYYY')} - ${dayjs(data.end_periode).format('DD/MM/YYYY')}`,
  },
]
