import { Formik, FormikHelpers } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

import { UniqueID } from '@/helpers/uniqueid'
import { loadTransactionIncomeExpense } from '@/redux/transaction/income-expenses/action'
import { TransactionIncomeExpenseService } from '@/services/api/TransactionIncomeExpenseService'

import { initialValues, validationSchema } from './constants'
import TransactionIncomeExpenseForm from './form'

interface ITransactionIncomeExpenseModal {
  modal: any
  onClose: () => void
  type: 'update' | 'create'
  loadTransactionIncomeExpenseList: any
}

function TransactionIncomeExpenseModal({
  modal,
  onClose,
  type,
  loadTransactionIncomeExpenseList,
}: ITransactionIncomeExpenseModal) {
  const onSubmitHandler = React.useCallback(
    (values: any, formikHelper: FormikHelpers<any>) => {
      const payload = {
        ...values,
        type: 'expense',
        category_id: values.category_id?.value,
      }
      formikHelper.setSubmitting(true)
      if (type === 'create') {
        toast
          .promise(TransactionIncomeExpenseService.Create(payload), {
            pending: 'Menambahkan Transaction Income Expense',
          })
          .then((response) => {
            if (response.data.data.over_budget) {
              toast.warning(response.data.message)
            } else {
              toast.success(response.data.message)
            }
            onClose()
            const controller = new AbortController()
            loadTransactionIncomeExpenseList(
              {
                orderBy: 'created_at',
                sortedBy: 'desc',
                type: 'expense',
              },
              controller.signal
            )
          })
          .catch((err) => {
            toast(err?.message, {
              type: 'error',
            })
          })
          .finally(() => formikHelper.setSubmitting(false))
        return
      }
      toast
        .promise(TransactionIncomeExpenseService.Update(modal?.id, payload), {
          success: 'Transaction Income Expense berhasil diubah',
          pending: 'Mengubah Transaction Income Expense',
        })
        .then(() => {
          onClose()
          loadTransactionIncomeExpenseList({
            orderBy: 'created_at',
            sortedBy: 'desc',
            type: 'expense',
          })
        })
        .catch((err) => {
          toast(err?.message, {
            type: 'error',
          })
        })
        .finally(() => formikHelper.setSubmitting(false))
    },
    [type, modal]
  )

  return (
    <Formik
      key={`evaluasi-${type}-${UniqueID()}`}
      initialValues={type === 'create' ? initialValues : modal}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ handleSubmit, resetForm, isSubmitting }) => (
        <CModal
          visible={!!modal}
          backdrop={isSubmitting ? 'static' : true}
          onClose={() => {
            resetForm()
            onClose()
          }}
        >
          <CModalHeader closeButton>
            <CModalTitle>Pengeluaran</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <TransactionIncomeExpenseForm
              defaultValues={type === 'create' ? initialValues : modal}
            />
          </CModalBody>
          <CModalFooter>
            <CButton
              color='secondary'
              disabled={isSubmitting}
              onClick={() => {
                resetForm()
                onClose()
              }}
              type='button'
            >
              Tutup
            </CButton>
            <CButton
              color='primary'
              disabled={isSubmitting}
              onClick={() => {
                handleSubmit()
              }}
              type='submit'
            >
              Simpan
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </Formik>
  )
}

export default connect(null, {
  loadTransactionIncomeExpenseList: loadTransactionIncomeExpense,
})(TransactionIncomeExpenseModal)
