import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CButton } from '@coreui/react'
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

const Verify = ({ loginUserSuccessAction, loadCurrentUserAction }) => {
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
      .post('/auth/verify', {
        key: location.state?.key,
        otp: values.otp,
        type: location.state?.type ?? 'login',
        email: location.state?.email,
      })
      .then((response) => {
        toast('Kode OTP berhasil diverifikasi', {
          type: 'success',
        })
        const type = location.state?.type ?? 'login'
        if (type === 'login') {
          setCurrentToken(response.data.data)
          loginUserSuccessAction(response.data.data)
          loadCurrentUserAction(history)
          navigate('/dashboard', {
            replace: true,
          })
          return
        }
        if (type === 'forgot-password') {
          navigate('/auth/reset-password', {
            state: {
              token: response.data?.data.token,
            },
            replace: true,
          })
          return
        }
        // window.location.reload()
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

  const handleResend = React.useCallback(() => {
    axiosInterceptorInstance
      .post('/auth/resent-verify', {
        key: location.state?.key,
        email: location.state?.email,
        type: location.state?.type ?? 'login',
      })
      .then((response) => {
        setCount(30)
        toast('Kode OTP berhasil dikirim ulang', {
          type: 'success',
        })
      })
      .catch(() => {
        toast('Kode OTP gagal dikirim ulang', {
          type: 'error',
        })
      })
  }, [])

  if (!location.state?.key) {
    return <Navigate to='/auth/login' />
  }

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
        {({ handleSubmit, isSubmitting, resetForm }) => (
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
              <span className='fs-4'>Verify OTP</span>
            </div>
            <p className='text-body-secondary'>
              Kami telah mengirimkan kode ke email <b>{location.state?.email}</b>
            </p>
            <FormController type='text' size='lg' name='otp' label='OTP' required />
            <CButton
              color='primary'
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              type='submit'
              className='mt-2 mb-1 w-100'
            >
              Verifikasi
            </CButton>
            <CButton
              disabled={isSubmitting || count > 0}
              onClick={() => {
                resetForm()
                handleResend()
              }}
              type='button'
              className='w-100'
              variant='ghost'
            >
              {count > 0 ? `Kirim Ulang Kode (${count})` : 'Kirim Ulang Kode'}
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
})(Verify)
