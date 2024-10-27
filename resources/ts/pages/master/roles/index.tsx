import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import { loadMasterRole } from '@/redux/master/roles/action'
import MTable from '@/components/MTable'
import { MasterRoleService } from '@/services/api/MasterRoleService'

import { useMasterRoleUtil } from './utils'
import MasterRoleModal from './modal'

function MasterRolePage({
    loadMasterRoleList,
    masterRolesApp,
}) {
    const {
        columns,
        onSearch,
        onSort,
        onChangePage,
        onCreate,
        onChangeLimit,
        filters,
        onMultiSearch,
        modal,
        onCloseModal,
        onEdit,
        typeModal,
    } = useMasterRoleUtil()
    const { data, loading, meta } = masterRolesApp

    const controller = React.useRef<AbortController | null>()

    React.useEffect(() => {
        controller.current = new AbortController()
        loadMasterRoleList(filters, controller.current.signal)
        return () => {
            if (controller.current) controller.current.abort()
        }
    }, [filters])

    const onDestroy = React.useCallback(
        (data) => {
            Swal.fire({
                icon: 'warning',
                title: 'Hapus Master Role',
                text: `Apa kamu yakin ingin menghapus Master Role ${data.name}?`,
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus',
                confirmButtonColor: 'var(--cui-primary)',
                cancelButtonColor: 'var(--cui-secondary)',
                background: 'var(--cui-body-bg)',
                color: 'var(--cui-body-color)',
            }).then((result) => {
                if (result.isConfirmed) {
                    toast
                        .promise(MasterRoleService.Delete(data.id), {
                            pending: 'Menghapus data Master Role',
                            success: 'Data Master Role berhasil dihapus',
                        })
                        .catch((err) => {
                            toast(err?.message, {
                                type: 'error',
                            })
                        })
                        .then(() => {
                            loadMasterRoleList(filters, controller.current?.signal)
                        })
                }
            })
        },
        [filters]
    )

    const onBulkDestroy = React.useCallback((ids: any[]) => {
        Swal.fire({
            icon: 'warning',
            title: 'Hapus Beberapa Master Role',
            text: `Apa kamu yakin ingin menghapus beberapa Master Role?`,
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            confirmButtonColor: 'var(--cui-primary)',
            cancelButtonColor: 'var(--cui-secondary)',
            background: 'var(--cui-body-bg)',
            color: 'var(--cui-body-color)',
        }).then((result) => {
            if (result.isConfirmed) {
                toast
                    .promise(MasterRoleService.BulkDelete(ids), {
                        pending: 'Menghapus data Master Role',
                        success: 'Data Master Role berhasil dihapus',
                    })
                    .catch((err) => {
                        toast(err?.message, {
                            type: 'error',
                        })
                    })
                    .then(() => {
                        loadMasterRoleList(filters, controller.current?.signal)
                    })
            }
        })
    }, [filters])


    const onExport = React.useCallback(() => {
        toast
        .promise(MasterRoleService.Exports(filters), {
            pending: 'Export data Master Role',
            success: 'Data Master Role berhasil diexport',
        })
        .catch((err) => {
            toast(err?.message, {
            type: 'error',
            })
        })
        .then((response: any) => {
            const { data } = response
            const base64 = `data:${data.data.mime_type};base64,${data.data.base64}`
            const a = document.createElement('a')
            a.href = base64
            a.setAttribute('download', data.data.file_name)
            a.target = '_blank'
            a.click()
        })
    }, [filters])

    return (
        <>
            <MTable
                title='Master Role'
                columns={columns}
                showCheckbox
                data={data}
                meta={meta}
                loading={loading}
                onSort={onSort}
                onSearch={onSearch}
                onChangePage={onChangePage}
                onChangeLimit={onChangeLimit}
                onMultiSearch={onMultiSearch}
                onHandlerSelected={(selecteds) => onBulkDestroy(selecteds)}
                onCreate={onCreate}
                onExport={onExport}
                filters={filters}
                actions={[
                    {
                        iconName: 'pencil',
                        title: 'Edit',
                        variant: 'secondary',
                        onClick: (item) => {
                            onEdit(item)
                        },
                    },
                    {
                        iconName: 'trash',
                        title: 'Hapus',
                        variant: 'secondary',
                        onClick: (item) => {
                            onDestroy(item)
                        },
                    },
                ]}
            />
            <MasterRoleModal
                onClose={onCloseModal}
                modal={modal}
                type={typeModal}
            />
        </>
    )
}

const mapStateToProps = ({ masterRolesApp }) => ({
    masterRolesApp,
})

export default connect(mapStateToProps, {
    loadMasterRoleList: loadMasterRole,
})(MasterRolePage)
