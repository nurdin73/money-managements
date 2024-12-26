import dayjs from 'dayjs'
import { CBadge as Badge } from '@coreui/react'
import { IColumns } from '@/components/MTable/types'

export type TMasterCategory = {
    name: any
    is_active: any
}

export const getColumns = (): IColumns<TMasterCategory>[] => [
    {
        label: 'Name',
        id: 'name',
        filters: {
            type: 'input',
        },
    },
    {
        label: 'Is Active',
        id: 'is_active',
        render: (data) => (
            <Badge className='text-white' color={data.is_active ? 'success' : 'danger'}>
                {data.is_active ? 'Aktif' : 'Non Aktif'}
            </Badge>
        ),
        filters: {
            type: 'select',
            options: [
                {
                    label: 'Aktif',
                    value: true,
                },
                {
                    label: 'Non Active',
                    value: false,
                },
                {
                    label: 'All',
                    value: undefined,
                },
            ],
        },
    },
]
