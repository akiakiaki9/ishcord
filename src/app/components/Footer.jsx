"use state"
import Link from 'next/link';
import React from 'react'
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-header">
        <div className="footer-header__section">
          <Link href='/'><img src="/images/ishcord.PNG" alt="IshCord Logo" /></Link>
        </div>
        <div className="footer-header__section">
          <p>Разработано в <a href="https://akbarsoft.uz"><span>Akbar Soft</span></a></p>
          <a href="https://akbarsoft.uz"><button>Посетить</button></a>
        </div>
      </div>
      <div className="footer-blok">
        <div className="footer-blok__section">
          <p className='footer-blok__section__p1'>Страницы</p>
          <Link href="/"><p className='footer-blok__section__p2'>Главное</p></Link>
          <Link href="/vacancy"><p className='footer-blok__section__p2'>Вакансии</p></Link>
          <Link href="/requirements"><p className='footer-blok__section__p2'>Требования к ПО</p></Link>
          <Link href="/"><p className='footer-blok__section__p2'>Помощь</p></Link>
        </div>
        <div className="footer-blok__section">
          <p className='footer-blok__section__p1'>Полезное</p>
          <Link href="/"><p className='footer-blok__section__p2'>Вакансии</p></Link>
          <Link href="/"><p className='footer-blok__section__p2'>Мой профиль</p></Link>
          <Link href="/"><p className='footer-blok__section__p2'>Уведомления</p></Link>
        </div>
        <div className="footer-blok__section">
          <p className='footer-blok__section__p1'>Socail Links</p>
          <div className="footer-blok__section__container">
            <a href="https://t.me/ishcord"><FaTelegramPlane className="footer-blok__section__container__icon" /></a>
            <a href="https://t.me/ishcord"><FaInstagram className="footer-blok__section__container__icon" /></a>
            <a href="https://t.me/ishcord"><FaFacebookF className="footer-blok__section__container__icon" /></a>
          </div>
        </div>
      </div>
      <div className="footer-footer">
        <p>IshCord v0.1 2025. Developed by <a href="https://akbarsoft.uz">Akbar Soft</a>, approved by <a href="https://hh.uz">hh</a>!</p>
      </div>
    </footer>
  )
};