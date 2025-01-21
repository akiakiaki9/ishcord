'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { FaHeart } from "react-icons/fa";
import { PiChatBold } from "react-icons/pi";
import { RiMenu3Fill } from "react-icons/ri";
import Link from 'next/link';
import ProfileDrop from './ProfileDrop';
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from '@/AuthContext';
import CreateVacancy from '../create-vacancy/CreateVacancy';
import Notifications from '../notifications/Notifications';
import NotificationsMob from '../notifications/NotificationsMob';

export default function NavbarComp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(pathname);
  const { checkAccessToken, accessToken } = useAuth();

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  useEffect(() => {
    const checkAuth = async () => {
      const isTokenValid = await checkAccessToken();
      if (!isTokenValid) {
        // router.push('/auth/login/');
        return;
      }

      if (!accessToken && refreshToken) {
        try {
          const refreshResponse = await axios.post('http://127.0.0.1:8000/api/login/refresh/',
            { refresh: refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );

          Cookies.set('access', refreshResponse.data.access, { path: '/' });
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error refreshing token:', error.response?.data || error.message);
        }
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <div className="navbar">
      <div className="navbar-blok">
        <div className="navbar-blok__section-1">
          <Link href="/"><img src="/images/logo.PNG" alt="IshCord Logo" /></Link>
          <Link href="/vacancy/responses"><p className='navbar-blok__section__p' style={{ color: activePage === '/vacancy/responses' ? 'var(--blue-light-color)' : '#fff' }}>Отклики</p></Link>
          <Link href="/vacancy"><p className='navbar-blok__section__p' style={{ color: activePage === '/vacancy' ? 'var(--blue-light-color)' : '#fff' }}>Вакансии</p></Link>
        </div>
        <div className="navbar-blok__section-2">
          <div>
            <Link href='/vacancy/chat/'><PiChatBold style={{ color: activePage === '/vacancy/chat' ? 'var(--blue-light-color)' : '#fff' }} className="navbar-blok__section__icon" /></Link>
            <Link href='/vacancy/favorites/'><FaHeart style={{ color: activePage === '/vacancy/favorites' ? 'var(--blue-light-color)' : '#fff' }} className="navbar-blok__section__icon" /></Link>
          </div>
          <div>
            <Notifications />
            <ProfileDrop style={{ color: activePage === '/vacancy/profile' ? 'var(--blue-light-color)' : '#fff' }} />
          </div>
          {isAuthenticated ? (
            <button className='navbar-blok__section-2__button'><CreateVacancy /></button>
          ) : (
            <button className='navbar-blok__section-2__button'><CreateVacancy /></button>
          )}
        </div>
      </div>

      <div className="navbar__container">
        <Link href="/"><img src="/images/logo.PNG" alt="IshCord Logo" /></Link>
        <div>
          <Link href='/vacancy/chat/'><PiChatBold style={{ color: activePage === '/vacancy/chat' ? 'var(--blue-light-color)' : '#fff' }} className="navbar-blok__section__icon" /></Link>
          <Link href='/vacancy/favorites/'><FaHeart style={{ color: activePage === '/vacancy/favorites' ? 'var(--blue-light-color)' : '#fff' }} className="navbar-blok__section__icon" /></Link>
          <ProfileDrop style={{ color: activePage === '/vacancy/profile' ? 'var(--blue-light-color)' : '#fff' }} />
          <RiMenu3Fill style={{ marginBottom: '5px' }} className="navbar-blok__section__icon" onClick={toggleMenu} />
        </div>
      </div>

      {/* Выпадающее меню */}
      {isMenuOpen && (
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="navbar-menu__top-1">
            <div className="navbar-menu__header">
              <Link href="/"><img src="/images/logo.PNG" alt="IshCord Logo" /></Link>
              <IoCloseSharp className='navbar-menu__close' onClick={toggleMenu} />
            </div>
            <ul>
              <li><Link className='navbar-menu__a' href="/vacancy/" style={{ color: activePage === '/vacancy' ? 'var(--blue-light-color)' : '' }}>Вакансии</Link></li>
              <li><Link className='navbar-menu__a' href="/vacancy/profile/" style={{ color: activePage === '/vacancy/profile' ? 'var(--blue-light-color)' : '' }}>Мой профиль</Link></li>
              <li><Link className='navbar-menu__a' href="/vacancy/favorites/" style={{ color: activePage === '/vacancy/favorites' ? 'var(--blue-light-color)' : '' }}>Избранное</Link></li>
              <li><Link className='navbar-menu__a' href="/vacancy/chat/" style={{ color: activePage === '/vacancy/chat' ? 'var(--blue-light-color)' : '' }}>Чат</Link></li>
              <li><Link className='navbar-menu__a' href="/vacancy/responses/" style={{ color: activePage === '/vacancy/responses' ? 'var(--blue-light-color)' : '' }}>Отклики</Link></li>
              <NotificationsMob />
              {isAuthenticated ? (
                <Link href='/vacancy/create-vacancy/'><p className='navbar-menu__button'><CreateVacancy /></p></Link>
              ) : (
                <p className='navbar-menu__button'><CreateVacancy /></p>
              )}
            </ul>
          </div>
          <div className="navbar-menu__top-2" onClick={toggleMenu}></div>
        </div>
      )}
    </div>
  );
}
