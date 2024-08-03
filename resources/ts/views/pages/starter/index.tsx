import FormController from '@/components/FormController'
import { CButton } from '@coreui/react'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
})

export default function Starter() {
  return (
    <div>
      <Formik
        initialValues={{
          name: null,
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <>
              <FormController size='lg' type='text' label='Test' name='name' />
              <FormController size='lg' type='textarea' label='Test' name='textarea' />
              <FormController size='lg' type='switch' label='Test' name='switch' />
              <FormController size='lg' type='checkbox' label='Test' name='checkbox' />
              <FormController size='lg' type='select' label='Test' name='select' />
              <FormController
                size='lg'
                type='date'
                label='Test'
                name='date'
                dateFormat='dd-MM-YYYY'
              />
              <FormController
                type='autocomplete'
                label='Auto Complete'
                name='autocomplete'
                urlAutoComplete='http://api.olahanku.test/v1/master/products'
                jsonOptions={(opt) => ({
                  label: opt.name,
                  value: opt.id,
                })}
              />
              <FormController
                type='autocomplete'
                label='Auto Complete'
                name='autocomplete2'
                urlAutoComplete='http://api.olahanku.test/v1/master/products'
                jsonOptions={(opt) => ({
                  label: opt.name,
                  value: opt.id,
                })}
                multiple
              />
              <CButton
                type='submit'
                color='primary'
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              >
                Simpan
              </CButton>
            </>
          )
        }}
      </Formik>
    </div>
  )
}
