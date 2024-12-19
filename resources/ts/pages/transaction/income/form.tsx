import React from 'react'

import FormController from '@/components/FormController'

export default function TransactionIncomeExpenseForm({ defaultValues }) {
  return (
    <>
      <FormController label='Nama' type='text' name='name' required />
      <FormController label='Jumlah' type='number' name='amount' required />
      <FormController
        label='Jenis Pemasukkan'
        type='autocomplete'
        urlAutoComplete='/master/categories'
        name='category_id'
        required
      />
    </>
  )
}
