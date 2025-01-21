import Link from 'next/link'
import React from 'react'

export default function NoAuth() {
    return (
        <div className='no-auth'>
            <p>Вам нужно сначала <Link href='/auth/login/'>Войти</Link></p>
        </div>
    )
};