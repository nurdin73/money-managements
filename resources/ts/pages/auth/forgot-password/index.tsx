import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CButton, CFormFeedback } from '@coreui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Formik, FormikHelpers } from 'formik'
import { initialValues, validationSchema } from './constant'
import FormController from '@/components/FormController'
import { connect } from 'react-redux'
import { loadCurrentUser, loginUser, loginUserSuccess } from '@/redux/actions'
import { toast } from 'react-toastify'
import axiosInterceptorInstance from '@/helpers/axiosInterceptor'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const onSubmitHandler = React.useCallback((values, formikState: FormikHelpers<any>) => {
    axiosInterceptorInstance
      .post(
        '/auth/forgot-password',
        {
          email: values.email,
        },
        {
          headers: {
            'x-captcha': values.captcha,
          },
        }
      )
      .then((response) => {
        toast(response.data.message, {
          type: 'success',
        })
        navigate('/auth/verify', {
          state: {
            key: response.data?.data.key,
            email: values.email,
            type: 'forgot-password',
          },
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
        {({ handleSubmit, isSubmitting, setFieldValue, values, errors }) => (
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
            <FormController type='email' size='lg' name='email' label='Email' required />
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
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              type='submit'
              className='mt-2 mb-1 w-100'
            >
              Kirim Kode Reset
            </CButton>
          </>
        )}
      </Formik>
    </>
  )
}

export default connect(null, null)(ForgotPassword)
