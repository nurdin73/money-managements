import * as Yup from 'yup'

export const initialValues = {
    name: null,
    email: null,
    created_at: null,
}

export const validationSchema = Yup.object().shape({
    name: Yup.mixed().required(),
    email: Yup.mixed().required(),
    created_at: Yup.mixed().required(),
})
