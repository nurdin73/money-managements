import * as Yup from 'yup'

export const tabs = ['Scaffold', 'View', 'Preview']
export const initialValues = {}

export const validationSchema = Yup.object().shape({
  table_name: Yup.string().required(),
  model: Yup.string().required(),
  controller: Yup.string().required(),
})

export const typeFields = [
  {
    label: 'String',
    value: 'string',
  },
  {
    label: 'Integer',
    value: 'integer',
  },
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Small Integer',
    value: 'smallInteger',
  },
  {
    label: 'Boolean',
    value: 'boolean',
  },
]
