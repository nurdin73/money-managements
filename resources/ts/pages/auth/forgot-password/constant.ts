import * as Yup from 'yup'

export const initialValues = {
  email: null,
  captcha: null
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  captcha: Yup.string().required(),
})