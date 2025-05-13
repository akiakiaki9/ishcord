'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Header() {
  const [counts, setCounts] = useState({ vacancies: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('https://api.hh.ru/vacancies?area=97');
        const data = await response.json();

        setCounts({
          vacancies: data.found || 0,
        });
      } catch (error) {
        console.error('Ошибка при получении данных с hh.ru:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className='header'>
      <div className="header-blok">
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
              <p className='header-blok__section-2-part__container-p1'>100 000+</p>
              <p>пользователей</p>
            </div>
            <div className="header-blok__section-2-part__container">
              <p className='header-blok__section-2-part__container-p1'>300+</p>
              <p>компаниий</p>
            </div>
          </div>
          <Link href="/vacancy"><button>К Вакансиям</button></Link>
        </div>
      </div>
    </div>
  );
};