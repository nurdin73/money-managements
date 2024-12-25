import React from 'react'

import FormController from '@/components/FormController'

export default function TransactionBudgetForm({ defaultValues }) {
  return (
    <>
      <FormController label='Name' type='text' name='name' required />
      <FormController label='Amount' type='number' name='amount' required />
      <FormController
        label='Jenis Anggaran'
        type='autocomplete'
        urlAutoComplete='/master/categories'
        name='category_id'
        required
      />
      <FormController label='Start Periode' type='date' name='start_periode' />
      <FormController label='End Periode' type='date' name='end_periode' />
    </>
  )
}
