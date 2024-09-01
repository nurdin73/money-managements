import { Formik, FormikHelpers } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

import { UniqueID } from '@/helpers/uniqueid'
import { loadMasterUser } from '@/redux/master/users/action'
import { MasterUserService } from '@/services/api/MasterUserService'

import { initialValues, validationSchema } from './constants'
import MasterUserForm from './form'

interface IMasterUserModal {
  modal: any
  onClose: () => void
  type: 'update' | 'create'
  loadMasterUserList: any
}

function MasterUserModal({ modal, onClose, type, loadMasterUserList }: IMasterUserModal) {
  const onSubmitHandler = React.useCallback(
    (values: any, formikHelper: FormikHelpers<any>) => {
      const payload = {
        ...values,
      }
      formikHelper.setSubmitting(true)
      if (type === 'create') {
        toast
          .promise(MasterUserService.Create(payload), {
            success: 'Master User berhasil dibuat',
            pending: 'Menambahkan Master User',
          })
          .then(() => {
            onClose()
            const controller = new AbortController()
            loadMasterUserList(
              {
                orderBy: 'created_date',
                sortedBy: 'desc',
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
        .promise(MasterUserService.Update(modal?.id, payload), {
          success: 'Master User berhasil diubah',
          pending: 'Mengubah Master User',
        })
        .then(() => {
          onClose()
          loadMasterUserList({
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
            <CModalTitle>Master User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <MasterUserForm defaultValues={type === 'create' ? initialValues : modal} />
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
  loadMasterUserList: loadMasterUser,
})(MasterUserModal)
