import React from 'react'

import FormController from '@/components/FormController'

export default function TransactionBudgetForm({ defaultValues }) {
    return (
        <>
            <FormController
                label='Name'
                type='text'
                name='name'
                required
            />
            <FormController
                label='Amount'
                type='text'
                name='amount'
                required
            />
            <FormController
                label='Category'
                type='text'
                name='category'
                required
            />
            <FormController
                label='Created At'
                type='text'
                name='created_at'
                required
            />
        </>
    )
}
