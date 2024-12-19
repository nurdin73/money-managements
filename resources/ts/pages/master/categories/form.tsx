import React from 'react'

import FormController from '@/components/FormController'

export default function MasterCategoryForm({ defaultValues }) {
    return (
        <>
            <FormController
                label='Name'
                type='text'
                name='name'
                required
            />
            <FormController
                label='Is Active'
                type='switch'
                name='is_active'
                required
            />
        </>
    )
}
