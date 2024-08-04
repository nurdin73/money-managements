import * as Yup from 'yup'

export const initialValues = {
  otp: null,
}

export const validationSchema = Yup.object().shape({
  otp: Yup.number().required(),
})