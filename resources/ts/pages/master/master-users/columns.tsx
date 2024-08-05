import dayjs from 'dayjs'
import { CBadge as Badge } from '@coreui/react'
import { IColumns } from '@/components/MTable/types'

export type TMasterUser = {
  no: any
  name: any
  email: any
  created_at: any
}

export const getColumns = (): IColumns<TMasterUser>[] => [
  {
    label: 'No',
    id: 'no',
    width: '10px',
  },
  {
    label: 'Name',
    id: 'name',
    filters: {
      type: 'input',
    },
  },
  {
    label: 'Email',
    id: 'email',
    filters: {
      type: 'input',
    },
  },
  {
    label: 'Created At',
    id: 'created_at',
    render: (data) => dayjs(data.created_at).format('DD/MM/YYYY'),
    filters: {
      type: 'date',
    },
    width: 300,
  },
]
