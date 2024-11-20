import Link from 'next/link'
import React from 'react'

export default function HeaderComp() {
  return (
    <div className='header'>
      <div className="header-blok">
        <div className="header-blok__section-1">
          <div className="header-blok__section-1-part">
            <Link href="/"><img src="/images/logo.PNG" alt="IshCord Logo" /></Link>
          </div>
          <div className="header-blok_section-1-part">
            <Link href="/log-in"><button className='header-blok_section-1-part-button1'>Войти</button></Link>
            <Link href="/sign-up"><button className='header-blok_section-1-part-button2'>Зарегистрироваться</button></Link>
          </div>
        </div>
        <div className="header-blok__section-2">
          <div className="header-blok__section-2-part">
            <h1>Найди работу мечты</h1>
          </div>
          <div className="header-blok__section-2-part-2">
            <div className="header-blok__section-2-part__container">
              <p className='header-blok__section-2-part__container-p1'>1000</p>
              <p>вакансий</p>
            </div>
            <div className="header-blok__section-2-part__container">
              <p className='header-blok__section-2-part__container-p1'>1000</p>
              <p>пользователей</p>
            </div>
            <div className="header-blok__section-2-part__container">
              <p className='header-blok__section-2-part__container-p1'>1000</p>
              <p>компаниий</p>
            </div>
          </div>
          <Link href="/vacancy"><button>К Вакансиям</button></Link>
        </div>
      </div>
    </div>
  )
};