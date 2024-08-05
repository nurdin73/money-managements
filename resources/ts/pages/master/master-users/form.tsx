import React from 'react'

import FormController from '@/components/FormController'

export default function MasterUserForm({ defaultValues }) {
    return (
        <>
            <FormController
                label='Name'
                type='text'
                name='name'
                required
            />
            <FormController
                label='Email'
                type='text'
                name='email'
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
