'use client'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'

export default function Header() {

  const headerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [counts, setCountes] = useState({ vacancies: 0, users: 0, compaines: 0 });

  // Инициализация IntersectionObserver для отслеживания видимости элемента
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting); // Устанавливаем состояние, если элемент виден
      },
      { threshold: 0.1 } // Будет срабатывать, когда хотя бы 10% элемента будет видны
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [vacRes] = await Promise.all([fetch('https://api.hh.ru/vacancies?area=97')]);
        const vacData = await vacRes.json();

        const targetCounts = {
          vacancies: vacData.found || 0,
          users: 100000, // Здесь можно оставить временное число или подключить другой источник
          compaines: 300
        };

        // Устанавливаем значения сразу, без анимации
        setCountes(targetCounts);
      } catch (error) {
        console.error('Ошибка при получении данных с hh.ru:', error);
      }
    };

    if (inView) {
      fetchCounts();
    }
  }, [inView]);

  return (
    <div className='header' ref={headerRef}>
      <div className="header-blok">
        <div className="header-blok__section-1">
          <div className="header-blok__section-1-part">
            <Link href="/"><img src="/images/ishcord.PNG" alt="IshCord Logo" /></Link>
          </div>
        </div>
        <div className="header-blok__section-2">
          <div className="header-blok__section-2-part">
            <h1>Найди работу мечты</h1>
          </div>
          <div className="header-blok__section-2-part-2">
            <div className="header-blok__section-2-part__container">
              <p className='header-blok__section-2-part__container-p1'>{counts.vacancies}+</p>
              <p>вакансий</p>
            </div>
            <div className="header-blok__section-2-part__container">
              <p className='header-blok__section-2-part__container-p1'>{counts.users}+</p>
              <p>пользователей</p>
            </div>
            <div className="header-blok__section-2-part__container">
              <p className='header-blok__section-2-part__container-p1'>{counts.compaines}+</p>
              <p>компаниий</p>
            </div>
          </div>
          <Link href="/vacancy"><button>К Вакансиям</button></Link>
        </div>
      </div>
    </div>
  );
};