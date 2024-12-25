import React from 'react'

import FormController from '@/components/FormController'

export default function TransactionBudgetForm({ defaultValues }) {
  return (
    <>
      <FormController label='Name' type='text' name='name' required />
      <FormController label='Amount' type='text' name='amount' required />
      <FormController
        label='Jenis Pengeluaran'
        type='autocomplete'
        urlAutoComplete='/master/categories'
        name='category_id'
        required
      />
      <FormController
        label='Periode'
        type='select'
        name='periode'
        options={[
          {
            label: 'Pilih',
            value: undefined,
          },
          {
            label: 'Harian',
            value: 'Harian',
          },
          {
            label: 'Bulanan',
            value: 'Bulanan',
          },
          {
            label: 'Tahunan',
            value: 'Tahunan',
          },
        ]}
      />
    </>
  )
}
