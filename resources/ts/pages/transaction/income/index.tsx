import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

import { loadTransactionIncomeExpense } from '@/redux/transaction/income-expenses/action'
import MTable from '@/components/MTable'
import { TransactionIncomeExpenseService } from '@/services/api/TransactionIncomeExpenseService'

import { useTransactionIncomeExpenseUtil } from './utils'
import TransactionIncomeExpenseModal from './modal'

function TransactionIncomeExpensePage({
  loadTransactionIncomeExpenseList,
  transactionIncomeExpensesApp,
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
  } = useTransactionIncomeExpenseUtil()
  const { data, loading, meta } = transactionIncomeExpensesApp

  const controller = React.useRef<AbortController | null>()

  React.useEffect(() => {
    controller.current = new AbortController()
    loadTransactionIncomeExpenseList({ ...filters, type: 'income' }, controller.current.signal)
    return () => {
      if (controller.current) controller.current.abort()
    }
  }, [filters])

  const onDestroy = React.useCallback(
    (data) => {
      Swal.fire({
        icon: 'warning',
        title: 'Hapus pemasukkan',
        text: `Apa kamu yakin ingin menghapus pemasukkan ${data.name}?`,
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        confirmButtonColor: 'var(--cui-primary)',
        cancelButtonColor: 'var(--cui-secondary)',
        background: 'var(--cui-body-bg)',
        color: 'var(--cui-body-color)',
      }).then((result) => {
        if (result.isConfirmed) {
          toast
            .promise(TransactionIncomeExpenseService.Delete(data.id), {
              pending: 'Menghapus data pemasukkan',
              success: 'Data pemasukkan berhasil dihapus',
            })
            .catch((err) => {
              toast(err?.message, {
                type: 'error',
              })
            })
            .then(() => {
              loadTransactionIncomeExpenseList(filters, controller.current?.signal)
            })
        }
      })
    },
    [filters]
  )

  const onBulkDestroy = React.useCallback(
    (ids: any[]) => {
      Swal.fire({
        icon: 'warning',
        title: 'Hapus Beberapa Pemasukkan',
        text: `Apa kamu yakin ingin menghapus beberapa Pemasukkan?`,
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        confirmButtonColor: 'var(--cui-primary)',
        cancelButtonColor: 'var(--cui-secondary)',
        background: 'var(--cui-body-bg)',
        color: 'var(--cui-body-color)',
      }).then((result) => {
        if (result.isConfirmed) {
          toast
            .promise(TransactionIncomeExpenseService.BulkDelete(ids), {
              pending: 'Menghapus data pemasukkan',
              success: 'Data pemasukkan berhasil dihapus',
            })
            .catch((err) => {
              toast(err?.message, {
                type: 'error',
              })
            })
            .then(() => {
              loadTransactionIncomeExpenseList(
                { ...filters, type: 'income' },
                controller.current?.signal
              )
            })
        }
      })
    },
    [filters]
  )

  const onExport = React.useCallback(() => {
    toast
      .promise(TransactionIncomeExpenseService.Exports(filters), {
        pending: 'Export data pemasukkan',
        success: 'Data pemasukkan berhasil diexport',
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
        title='Pemasukkan'
        columns={columns}
        showCheckbox
        data={data}
        meta={meta}
        loading={loading}
        onSort={onSort}
        onSearch={onSearch}
        searchFields={['name', 'category.name']}
        onChangePage={onChangePage}
        onChangeLimit={onChangeLimit}
        onMultiSearch={onMultiSearch}
        onHandlerSelected={(selecteds) => onBulkDestroy(selecteds)}
        onCreate={onCreate}
        // onExport={onExport}
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
      <TransactionIncomeExpenseModal onClose={onCloseModal} modal={modal} type={typeModal} />
    </>
  )
}

const mapStateToProps = ({ transactionIncomeExpensesApp }) => ({
  transactionIncomeExpensesApp,
})

export default connect(mapStateToProps, {
  loadTransactionIncomeExpenseList: loadTransactionIncomeExpense,
})(TransactionIncomeExpensePage)
