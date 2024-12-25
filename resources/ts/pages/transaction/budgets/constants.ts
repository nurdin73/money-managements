import * as Yup from 'yup'

export const initialValues = {
    name: null,
    amount: null,
    category_id: null,
    start_periode: null,
    end_periode: null,
}

export const validationSchema = Yup.object().shape({
    name: Yup.mixed().required(),
    amount: Yup.number().min(1).required(),
    category_id: Yup.mixed().required(),
    start_periode: Yup.mixed().required(),
    end_periode: Yup.mixed().required(),
})
