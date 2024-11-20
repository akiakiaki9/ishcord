import React from 'react';
import Cookies from 'js-cookie';
import { IoExitOutline } from "react-icons/io5";
import Link from 'next/link';

const LogOut = () => {
  const logout = () => {
    // Удаляем все куки, связанные с авторизацией
    Cookies.remove('auth_token', { secure: true, sameSite: 'Strict' });  // Токен авторизации
    Cookies.remove('confirmation_code', { secure: true, sameSite: 'Strict' }); // Код подтверждения (если используется)

    // Перенаправляем пользователя на страницу входа
    window.location.href = '/login';  // Замените '/login' на путь к вашей странице входа
  };

  return (
    <Link href="/"><button onClick={logout} className='logout'>Выход <IoExitOutline className='logout__icon' /></button></Link>
  );
};

export default LogOut;