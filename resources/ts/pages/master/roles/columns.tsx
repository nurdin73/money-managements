import dayjs from 'dayjs'
import { CBadge as Badge } from '@coreui/react'
import { IColumns } from '@/components/MTable/types'

export type TMasterRole = {
    name: any
}

export const getColumns = (): IColumns<TMasterRole>[] => [
    {
        label: 'Name',
        id: 'name',
        filters: {
            type: 'input',
        },
    },
]
