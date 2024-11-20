'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { IoExitOutline } from "react-icons/io5";

export default function MenuComp() {
    const [isMenuOpen, setIsMenuOpen] = useState(true); // Меню открыто по умолчанию
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const [activePage, setActivePage] = useState(pathname);

    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth < 1000;
            setIsMobile(mobileView);
            setIsMenuOpen(!mobileView); // Если мобильная версия, скрываем меню
        };

        handleResize(); // Установка состояния при загрузке
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setActivePage(pathname);
    }, [pathname]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const logout = () => {
        // Удаляем все куки, связанные с авторизацией
        Cookies.remove('auth_token', { secure: true, sameSite: 'Strict' });  // Токен авторизации
        Cookies.remove('confirmation_code', { secure: true, sameSite: 'Strict' }); // Код подтверждения (если используется)

        // Перенаправляем пользователя на страницу входа
        window.location.href = '/login';  // Замените '/login' на путь к вашей странице входа
    };

    return (
        <div>
            {/* Кнопка для открытия меню (показывается только в мобильной версии) */}
            {isMobile && (
                <AiOutlineMenu className="menu__icon" onClick={toggleMenu} />
            )}

            {/* Меню */}
            <div className={`menu ${isMobile && !isMenuOpen ? 'hidden' : ''}`}>
                {isMobile && (
                    <AiOutlineClose className="menu__close" onClick={toggleMenu} />
                )}
                <div className="menu-blok">
                    <div className="menu-blok__section-1">
                        <Link href="/"><img src="/images/logo.PNG" alt="IshCord Logo" /></Link>
                    </div>
                    <div className="menu-blok__section-2">
                        <Link href="/vacancy" onClick={() => handleLinkClick('/vacancy')} style={{ color: activePage === '/vacancy' ? '#fff' : '', backgroundColor: activePage === '/vacancy' ? 'var(--blue-color)' : '' }}>
                            Вакансии
                        </Link>
                        <Link href="/vacancy/favorites" onClick={() => handleLinkClick('/vacancy/favorites')} style={{ color: activePage === '/vacancy/favorites' ? '#fff' : '', backgroundColor: activePage === '/vacancy/favorites' ? 'var(--blue-color)' : '' }}>
                            Избранные
                        </Link>
                        <Link href="/vacancy/application" onClick={() => handleLinkClick('/vacancy/application')} style={{ color: activePage === '/vacancy/application' ? '#fff' : '', backgroundColor: activePage === '/vacancy/application' ? 'var(--blue-color)' : '' }}>
                            Отклики
                        </Link>
                    </div>
                    <div className="menu-blok__section-3">
                        <Link href="/vacancy/profile" onClick={() => handleLinkClick('/vacancy/profile')} style={{ color: activePage === '/vacancy/profile' ? '#fff' : '', backgroundColor: activePage === '/vacancy/profile' ? 'var(--blue-color)' : '' }}>
                            Мой профиль <MdAccountCircle className='menu-blok__section-3__icon' />
                        </Link>
                    </div>
                    <div className="menu-blok__section-4">
                        <Link href="/" onClick={logout}>Выход <IoExitOutline className='logout__icon' /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};