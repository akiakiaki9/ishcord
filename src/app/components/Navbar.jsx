'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(pathname);

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  return (
    <div className="navbar">
      <div className="navbar-blok">
        <div className="navbar-blok__section-1">
          <Link href="/"><img src="/images/ishcord1.PNG" alt="IshCord Logo" /></Link>
          <Link href="/vacancy">
            <p className='navbar-blok__section__p' style={{ color: activePage === '/vacancy' ? 'var(--blue-light-color)' : '#fff' }}>Вакансии</p>
          </Link>
          <Link href="/categories">
            <p className='navbar-blok__section__p' style={{ color: activePage === '/categories' ? 'var(--blue-light-color)' : '#fff' }}>Категории</p>
          </Link>
        </div>
      </div>
    </div>
  );
};