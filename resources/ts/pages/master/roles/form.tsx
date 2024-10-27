import React from 'react'

import FormController from '@/components/FormController'

export default function MasterRoleForm({ defaultValues }) {
    return (
        <>
            <FormController
                label='Name'
                type='text'
                name='name'
                required
            />
        </>
    )
}
