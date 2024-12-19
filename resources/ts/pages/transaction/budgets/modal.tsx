import { Formik, FormikHelpers } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { 
    CButton, 
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle, 
} from '@coreui/react'

import { UniqueID } from '@/helpers/uniqueid'
import { loadTransactionBudget } from '@/redux/transaction/budgets/action'
import { TransactionBudgetService } from '@/services/api/TransactionBudgetService'

import { initialValues, validationSchema } from './constants'
import TransactionBudgetForm from './form'

interface ITransactionBudgetModal {
    modal: any
    onClose: () => void
    type: 'update' | 'create'
    loadTransactionBudgetList: any
}

function TransactionBudgetModal({
    modal,
    onClose,
    type,
    loadTransactionBudgetList,
}: ITransactionBudgetModal) {
    const onSubmitHandler = React.useCallback(
        (values: any, formikHelper: FormikHelpers<any>) => {
            const payload = {
                ...values,
            }
            formikHelper.setSubmitting(true)
            if (type === 'create') {
                toast
                    .promise(TransactionBudgetService.Create(payload), {
                        success: 'Transaction Budget berhasil dibuat',
                        pending: 'Menambahkan Transaction Budget',
                    })
                    .then(() => {
                        onClose()
                        const controller = new AbortController()
                        loadTransactionBudgetList({
                            orderBy: 'created_date',
                            sortedBy: 'desc',
                        }, controller.signal)
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
                .promise(TransactionBudgetService.Update(modal?.id, payload), {
                    success: 'Transaction Budget berhasil diubah',
                    pending: 'Mengubah Transaction Budget',
                })
                .then(() => {
                    onClose()
                    loadTransactionBudgetList({
                        orderBy: 'created_date',
                        sortedBy: 'desc',
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
                        <CModalTitle>Transaction Budget</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <TransactionBudgetForm
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
    loadTransactionBudgetList: loadTransactionBudget,
})(TransactionBudgetModal)
