import { Formik, FormikHelpers } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

import { UniqueID } from '@/helpers/uniqueid'
import { loadMasterCategory } from '@/redux/master/categories/action'
import { MasterCategoryService } from '@/services/api/MasterCategoryService'

import { initialValues, validationSchema } from './constants'
import MasterCategoryForm from './form'

interface IMasterCategoryModal {
  modal: any
  onClose: () => void
  type: 'update' | 'create'
  loadMasterCategoryList: any
}

function MasterCategoryModal({
  modal,
  onClose,
  type,
  loadMasterCategoryList,
}: IMasterCategoryModal) {
  const onSubmitHandler = React.useCallback(
    (values: any, formikHelper: FormikHelpers<any>) => {
      const payload = {
        ...values,
      }
      formikHelper.setSubmitting(true)
      if (type === 'create') {
        toast
          .promise(MasterCategoryService.Create(payload), {
            success: 'Master Category berhasil dibuat',
            pending: 'Menambahkan Master Category',
          })
          .then(() => {
            onClose()
            const controller = new AbortController()
            loadMasterCategoryList(
              {
                orderBy: 'created_at',
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
        .promise(MasterCategoryService.Update(modal?.id, payload), {
          success: 'Master Category berhasil diubah',
          pending: 'Mengubah Master Category',
        })
        .then(() => {
          onClose()
          loadMasterCategoryList({
            orderBy: 'created_at',
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
            <CModalTitle>Master Category</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <MasterCategoryForm defaultValues={type === 'create' ? initialValues : modal} />
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
  loadMasterCategoryList: loadMasterCategory,
})(MasterCategoryModal)
