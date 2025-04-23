'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Header() {

  const { ref, inView } = useInView({ triggerOnce: true });
  const [counts, setCountes] = useState({ vacancies: 0, users: 0, compaines: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [vacRes] = await Promise.all([
          fetch('https://api.hh.ru/vacancies?area=97')
        ]);
  
        const vacData = await vacRes.json();
  
        const targetCounts = {
          vacancies: vacData.found || 0,
          users: 100000, // Здесь можно оставить временное число или подключить другой источник
          compaines: 300
        };
  
        const duration = 3000;
        const startTime = performance.now();
  
        const animate = (time) => {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
  
          setCountes({
            vacancies: Math.floor(targetCounts.vacancies * easedProgress),
            users: Math.floor(targetCounts.users * easedProgress),
            compaines: Math.floor(targetCounts.compaines * easedProgress),
          });
  
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
  
        requestAnimationFrame(animate);
      } catch (error) {
        console.error('Ошибка при получении данных с hh.ru:', error);
      }
    };
  
    if (inView) {
      fetchCounts();
    }
  }, [inView]);

  return (
    <div className='header' ref={ref}>
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
  )
};