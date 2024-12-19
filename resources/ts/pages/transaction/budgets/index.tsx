import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import { loadTransactionBudget } from '@/redux/transaction/budgets/action'
import MTable from '@/components/MTable'
import { TransactionBudgetService } from '@/services/api/TransactionBudgetService'

import { useTransactionBudgetUtil } from './utils'
import TransactionBudgetModal from './modal'

function TransactionBudgetPage({
    loadTransactionBudgetList,
    transactionBudgetsApp,
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
    } = useTransactionBudgetUtil()
    const { data, loading, meta } = transactionBudgetsApp

    const controller = React.useRef<AbortController | null>()

    React.useEffect(() => {
        controller.current = new AbortController()
        loadTransactionBudgetList(filters, controller.current.signal)
        return () => {
            if (controller.current) controller.current.abort()
        }
    }, [filters])

    const onDestroy = React.useCallback(
        (data) => {
            Swal.fire({
                icon: 'warning',
                title: 'Hapus Transaction Budget',
                text: `Apa kamu yakin ingin menghapus Transaction Budget ${data.name}?`,
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus',
                confirmButtonColor: 'var(--cui-primary)',
                cancelButtonColor: 'var(--cui-secondary)',
                background: 'var(--cui-body-bg)',
                color: 'var(--cui-body-color)',
            }).then((result) => {
                if (result.isConfirmed) {
                    toast
                        .promise(TransactionBudgetService.Delete(data.id), {
                            pending: 'Menghapus data Transaction Budget',
                            success: 'Data Transaction Budget berhasil dihapus',
                        })
                        .catch((err) => {
                            toast(err?.message, {
                                type: 'error',
                            })
                        })
                        .then(() => {
                            loadTransactionBudgetList(filters, controller.current?.signal)
                        })
                }
            })
        },
        [filters]
    )

    const onBulkDestroy = React.useCallback((ids: any[]) => {
        Swal.fire({
            icon: 'warning',
            title: 'Hapus Beberapa Transaction Budget',
            text: `Apa kamu yakin ingin menghapus beberapa Transaction Budget?`,
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            confirmButtonColor: 'var(--cui-primary)',
            cancelButtonColor: 'var(--cui-secondary)',
            background: 'var(--cui-body-bg)',
            color: 'var(--cui-body-color)',
        }).then((result) => {
            if (result.isConfirmed) {
                toast
                    .promise(TransactionBudgetService.BulkDelete(ids), {
                        pending: 'Menghapus data Transaction Budget',
                        success: 'Data Transaction Budget berhasil dihapus',
                    })
                    .catch((err) => {
                        toast(err?.message, {
                            type: 'error',
                        })
                    })
                    .then(() => {
                        loadTransactionBudgetList(filters, controller.current?.signal)
                    })
            }
        })
    }, [filters])


    const onExport = React.useCallback(() => {
        toast
        .promise(TransactionBudgetService.Exports(filters), {
            pending: 'Export data Transaction Budget',
            success: 'Data Transaction Budget berhasil diexport',
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
                title='Transaction Budget'
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
            <TransactionBudgetModal
                onClose={onCloseModal}
                modal={modal}
                type={typeModal}
            />
        </>
    )
}

const mapStateToProps = ({ transactionBudgetsApp }) => ({
    transactionBudgetsApp,
})

export default connect(mapStateToProps, {
    loadTransactionBudgetList: loadTransactionBudget,
})(TransactionBudgetPage)
