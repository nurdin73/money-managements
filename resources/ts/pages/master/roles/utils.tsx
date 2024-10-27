import React, { useContext } from 'react'

import { getColumns } from './columns'
import useMtableHook from '@/components/MTable/hooks/Mtable.hook'

export const useMasterRoleUtil = () => {
    const [modal, setModal] = React.useState<any>(false)
    const [typeModal, setTypeModal] = React.useState<'create' | 'update'>('create')
    
    const state = useMtableHook()

    const columns = React.useMemo(() => getColumns(), [])

    const onCreate = React.useCallback(() => {
        setModal(true)
        setTypeModal('create')
    }, [])

    const onEdit = React.useCallback((payload) => {
        setModal(payload)
        setTypeModal('update')
    }, [])

    const onCloseModal = React.useCallback(() => {
        setModal(null)
    }, [])

    return {
        ...state,
        columns,
        onCreate,
        modal,
        onCloseModal,
        onEdit,
        typeModal,
    }
}
