import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CFormFeedback, CSpinner } from '@coreui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Formik, FormikHelpers } from 'formik'
import { initialValues, validationSchema } from './Login.constant'
import FormController from '@/components/FormController'
import { connect } from 'react-redux'
import { loadCurrentUser, loginUser, loginUserSuccess } from '@/redux/actions'
import { toast } from 'react-toastify'
import axiosInterceptorInstance from '@/helpers/axiosInterceptor'

const Login = ({ loginUserAction, loading }) => {
  const navigate = useNavigate()
  const onSubmitHandler = React.useCallback(async (values, formikState: FormikHelpers<any>) => {
    formikState.setSubmitting(true)
    try {
      if (import.meta.env.VITE_OTP_LOGIN == 'true') {
        const response = await axiosInterceptorInstance.post(
          '/auth/login',
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              'x-captcha': values.captcha,
            },
          }
        )
        if (response.data.data.password_expired) {
          await toast(response.data.message, {
            type: 'info',
          })
          navigate('/auth/reset-password', {
            state: {
              token: response.data.data.token,
            },
            replace: true,
          })
          return
        }
        navigate('/auth/verify', {
          state: {
            key: response.data?.data.key,
            email: values.email,
            type: 'login',
          },
          replace: true,
        })
        return
      }
      loginUserAction(values, navigate)
    } catch (error: any) {
      toast.error(error?.message ?? 'Request Error')
    } finally {
      formikState.setSubmitting(false)
    }
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
            <h1>Login</h1>
            <p className='text-body-secondary'>Sign In to your account</p>
            <FormController
              type='email'
              name='email'
              label='Email'
              required
              disabled={isSubmitting || loading}
            />
            <FormController
              type='password'
              name='password'
              label='Kata Sandi'
              disabled={isSubmitting || loading}
            />
            {import.meta.env.VITE_CAPTCHA_ENABLED == 'true' && (
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
                value={values.captcha}
                onChange={(captcha) => {
                  setFieldValue('captcha', captcha)
                }}
              />
            )}
            {errors.captcha && (
              <CFormFeedback
                style={{
                  fontSize: '.875em',
                  color: 'var(--cui-form-invalid-color)',
                }}
              >
                {errors.captcha}
              </CFormFeedback>
            )}
            <CButton
              color='primary'
              disabled={loading || isSubmitting}
              onClick={() => handleSubmit()}
              type='submit'
              className='mt-4 w-100 d-flex align-items-center justify-content-center'
              size='lg'
            >
              {(loading || isSubmitting) && <CSpinner />} <span>Login</span>
            </CButton>
          </>
        )}
      </Formik>
      <div className='d-flex justify-content-center mt-2'>
        <Link to='/auth/forgot-password'>Lupa kata sandi?</Link>
      </div>
      <div className='separator text-center'>
        <span>
          Tidak memiliki akun? <Link to='/auth/register'>Daftar</Link>{' '}
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

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
  loginUserSuccessAction: loginUserSuccess,
  loadCurrentUserAction: loadCurrentUser,
})(Login)
