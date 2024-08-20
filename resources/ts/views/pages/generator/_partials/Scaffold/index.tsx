import FormController from '@/components/FormController'
import { useFormikContext } from 'formik'
import React from 'react'
import * as pluralize from 'pluralize'
import FieldColumns from './FieldColumns'

function Scaffold() {
  const { values, setFieldValue } = useFormikContext<any>()

  React.useEffect(() => {
    if (!values.model) return
    const timeout = setTimeout(() => {
      // generate name table
      const splitModelName = (values.model ?? '')?.split('/')
      let getModelName: string = splitModelName[splitModelName.length - 1]
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
      if (getModelName.startsWith('_')) {
        getModelName = getModelName.replace('_', '')
      }
      const val = pluralize.plural(getModelName)
      setFieldValue('table_name', val)
      let controllerName: string = values.model
      if (controllerName.endsWith('/')) {
        controllerName = controllerName.slice(0, controllerName.length - 1)
      }
      setFieldValue('controller', `${controllerName}Controller`)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [values.model])

  return (
    <>
      <FormController direction='horizontal' required name='model' label='Model' type='text' />
      <FormController direction='horizontal' name='table_name' label='Table Name' type='text' />
      <FormController direction='horizontal' name='controller' label='Controller' type='text' />
      <FieldColumns />
    </>
  )
}

export default Scaffold
