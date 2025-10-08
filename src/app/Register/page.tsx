import RegisterPage from '@/components/AuthPages/RegisterPage'
import React from 'react'

export default function Register() {
    return (
        <div className='py-10'>
            <h1 className="text-4xl font-bold text-black dark:text-white text-center">Create a new account</h1>
            <RegisterPage />
        </div>
    )
}
