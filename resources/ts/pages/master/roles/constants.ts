import * as Yup from 'yup'

export const initialValues = {
    name: null,
}

export const validationSchema = Yup.object().shape({
    name: Yup.mixed().required(),
})
