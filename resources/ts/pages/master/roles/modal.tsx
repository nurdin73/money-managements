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
import { loadMasterRole } from '@/redux/master/roles/action'
import { MasterRoleService } from '@/services/api/MasterRoleService'

import { initialValues, validationSchema } from './constants'
import MasterRoleForm from './form'

interface IMasterRoleModal {
    modal: any
    onClose: () => void
    type: 'update' | 'create'
    loadMasterRoleList: any
}

function MasterRoleModal({
    modal,
    onClose,
    type,
    loadMasterRoleList,
}: IMasterRoleModal) {
    const onSubmitHandler = React.useCallback(
        (values: any, formikHelper: FormikHelpers<any>) => {
            const payload = {
                ...values,
            }
            formikHelper.setSubmitting(true)
            if (type === 'create') {
                toast
                    .promise(MasterRoleService.Create(payload), {
                        success: 'Master Role berhasil dibuat',
                        pending: 'Menambahkan Master Role',
                    })
                    .then(() => {
                        onClose()
                        const controller = new AbortController()
                        loadMasterRoleList({
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
                .promise(MasterRoleService.Update(modal?.id, payload), {
                    success: 'Master Role berhasil diubah',
                    pending: 'Mengubah Master Role',
                })
                .then(() => {
                    onClose()
                    loadMasterRoleList({
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
                        <CModalTitle>Master Role</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <MasterRoleForm
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
    loadMasterRoleList: loadMasterRole,
})(MasterRoleModal)
