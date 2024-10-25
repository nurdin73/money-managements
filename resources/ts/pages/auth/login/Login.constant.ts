import * as Yup from 'yup'

export const initialValues = {
  email: null,
  password: null,
  captcha: null
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  captcha: Yup.string().when([], {
    is: () => import.meta.env.VITE_CAPTCHA_ENABLED == 'true',
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.nullable(),
  }),
})