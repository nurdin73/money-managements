import dayjs from 'dayjs'
import { CBadge as Badge } from '@coreui/react'
import { IColumns } from '@/components/MTable/types'

export type TTransactionBudget = {
    name: any
    amount: any
    category: any
    created_at: any
}

export const getColumns = (): IColumns<TTransactionBudget>[] => [
    {
        label: 'Name',
        id: 'name',
        filters: {
            type: 'input',
        },
    },
    {
        label: 'Amount',
        id: 'amount',
        filters: {
            type: 'input',
        },
    },
    {
        label: 'Category',
        id: 'category',
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
    },
]
