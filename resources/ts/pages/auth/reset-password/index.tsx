import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CButton, CFormFeedback } from '@coreui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Formik, FormikHelpers } from 'formik'
import { initialValues, validationSchema } from './constant'
import FormController from '@/components/FormController'
import { connect } from 'react-redux'
import { loadCurrentUser, loginUser, loginUserSuccess } from '@/redux/actions'
import { toast } from 'react-toastify'
import axiosInterceptorInstance from '@/helpers/axiosInterceptor'
import { setCurrentToken } from '@/helpers/utils'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'

const ResetPassword = ({ loginUserSuccessAction, loadCurrentUserAction }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [count, setCount] = React.useState<number>(30)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const onSubmitHandler = React.useCallback((values, formikState: FormikHelpers<any>) => {
    axiosInterceptorInstance
      .post('/auth/reset-password', {
        ...values,
        token: location.state.token,
      })
      .then((response) => {
        toast(response.data.message ?? 'Reset Password successfully', {
          type: 'success',
        })
        navigate('/auth/login', {
          replace: true,
        })
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
        })
      })
      .finally(() => {
        formikState.setSubmitting(false)
      })
  }, [])

  if (!location.state?.token) return <Navigate to='/auth/login' />

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
        {({ handleSubmit, isSubmitting }) => (
          <>
            <div className='d-flex align-items-center'>
              <CButton
                type='button'
                title='Kembali'
                variant='outline'
                onClick={() => navigate('/auth/login')}
              >
                <CIcon icon={cilArrowLeft} />
              </CButton>
              <span className='fs-4'>Lupa Kata Sandi</span>
            </div>
            <p className='text-body-secondary'>Masukkan Email untuk mereset sandi</p>
            <FormController type='password' name='password' label='Kata Sandi' />
            <FormController
              type='password'
              name='password_confirmation'
              label='Konfirmasi Kata Sandi'
            />
            <CButton
              color='primary'
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              type='submit'
              className='mt-2 mb-1 w-100'
              size='lg'
            >
              Reset Kata Sandi
            </CButton>
          </>
        )}
      </Formik>
    </>
  )
}

export default connect(null, {
  loginUserSuccessAction: loginUserSuccess,
  loadCurrentUserAction: loadCurrentUser,
})(ResetPassword)
