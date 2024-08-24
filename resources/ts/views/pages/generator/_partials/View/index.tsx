import FormController from '@/components/FormController'
import React from 'react'
import Form from './Form'
import Columns from './Columns'

function View() {
  return (
    <>
      <FormController
        required
        name='module_name'
        type='text'
        label='Module Name'
        direction='horizontal'
      />
      <FormController required name='path_url' type='text' label='Url' direction='horizontal' />
      <Form />
      <Columns />
    </>
  )
}

export default View
