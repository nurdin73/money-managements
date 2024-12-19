import * as Yup from 'yup'

export const initialValues = {
    name: null,
    amount: null,
    category: null,
    created_at: null,
}

export const validationSchema = Yup.object().shape({
    name: Yup.mixed().required(),
    amount: Yup.mixed().required(),
    category: Yup.mixed().required(),
    created_at: Yup.mixed().required(),
})
