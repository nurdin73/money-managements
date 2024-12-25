import * as Yup from 'yup'

export const initialValues = {
    name: null,
    amount: null,
    category_id: null,
}

export const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    amount: Yup.number().min(1).required(),
    category_id: Yup.mixed().required(),
})
