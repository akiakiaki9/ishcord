'use client';
import React from 'react';
import { FaSearch } from "react-icons/fa";
import { MdAddHomeWork } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  return (
    <div className='role'>
      <div className='role-blok'>
        <Link href='/'><img src='/images/logo.PNG' alt='/IshCord Logo' /></Link>
        <h1>Выберите, кто вы:</h1>
        <div className='role-blok__section'>
          <div onClick={() => router.push('/auth/signup/user/')} className='role-blok__section-part'>
            <p>Ищу работу</p>
            <FaSearch className='role-blok__section__icon' />
          </div>
          <div onClick={() => router.push('/auth/signup/company/')} className='role-blok__section-part'>
            <p>Ищу сотрудников</p>
            <MdAddHomeWork className='role-blok__section__icon' />
          </div>
        </div>
      </div>
    </div>
  );
};