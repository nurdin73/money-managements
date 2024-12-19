import * as Yup from 'yup'

export const initialValues = {
    name: null,
    is_active: true,
}

export const validationSchema = Yup.object().shape({
    name: Yup.mixed().required(),
    is_active: Yup.mixed().required(),
})
