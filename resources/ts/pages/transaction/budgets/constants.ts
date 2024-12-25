import * as Yup from 'yup'

export const initialValues = {
    name: null,
    amount: null,
    category_id: null,
}

export const validationSchema = Yup.object().shape({
    name: Yup.mixed().required(),
    amount: Yup.mixed().required(),
    category_id: Yup.mixed().required(),
})
