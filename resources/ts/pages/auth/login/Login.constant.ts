import * as Yup from 'yup'

export const initialValues = {
  email: null,
  password: null,
  captcha: null
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  captcha: Yup.string().required(),
})