import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CFormFeedback } from '@coreui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Formik, FormikHelpers } from 'formik'
import { initialValues, validationSchema } from './constant'
import FormController from '@/components/FormController'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import axiosInterceptorInstance from '@/helpers/axiosInterceptor'

const Register = () => {
  const navigate = useNavigate()
  const onSubmitHandler = React.useCallback((values, formikState: FormikHelpers<any>) => {
    formikState.setSubmitting(true)
    toast
      .promise(axiosInterceptorInstance.post('/auth/register', values), {
        pending: 'Mendaftarkan akun',
        success: 'Akun berhasil didaftarkan',
      })
      .then(() => {
        navigate('/auth/login')
      })
      .catch((err) => {
        toast.error(err?.message ?? 'Request Error')
      })
      .finally(() => {
        formikState.setSubmitting(false)
      })
  }, [])

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikState) => {
          onSubmitHandler(values, formikState)
        }}
        autoComplete='off'
      >
        {({ handleSubmit, isSubmitting, values, setFieldValue, errors }) => (
          <>
            <h1>Register</h1>
            <p className='text-body-secondary'>Buat akun baru</p>
            <FormController type='text' name='name' label='Nama Lengkap' required />
            <FormController type='email' name='email' label='Email' required />
            <FormController type='password' name='password' label='Kata sandi' />
            <FormController
              type='password'
              name='password_confirmation'
              label='Ulangi kata sandi'
            />
            <CButton
              color='primary'
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              type='submit'
              className='mt-4 w-100'
              size='lg'
            >
              Register
            </CButton>
          </>
        )}
      </Formik>
      <div className='separator text-center'>
        <span>
          Sudah memiliki akun? <Link to='/auth/login'>Masuk</Link>{' '}
        </span>
      </div>
    </>
  )
}

const mapStateToProps = function ({ authApp }) {
  const { loading } = authApp
  return {
    loading,
  }
}

export default connect(mapStateToProps, {})(Register)
