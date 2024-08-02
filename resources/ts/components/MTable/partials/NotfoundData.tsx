import React from 'react'

import EmptyState from '../Empty-State.png'
interface INotfoundData {
    message?: string
}

function NotfoundData({ message }: INotfoundData) {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <img
                src={EmptyState}
                alt='empty-state'
                style={{
                    width: 300,
                    height: 300,
                    objectFit: 'contain',
                    aspectRatio: '1/1',
                }}
            />
            <h1>{message ?? 'Not found'}</h1>
        </div>
    )
}

export default NotfoundData
