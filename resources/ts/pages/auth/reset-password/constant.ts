import * as Yup from 'yup'

export const initialValues = {
  password: null,
  password_confirmation: null,
}

export const validationSchema = Yup.object().shape({
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  ).required(),
  password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Konfirmasi Kata sandi tidak sama').required(),
})