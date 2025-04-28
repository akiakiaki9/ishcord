"use client"
import Link from 'next/link'
import React from 'react'

export default function About() {
    return (
        <div className='about'>
            <div className="about-blok">
                <div className="about-blok__section-1">
                    <h1>Ваш надежный партнер на рынке труда</h1>
                    <p>
                        Мы помогаем компаниям найти талантливых сотрудников, а кандидатам – интересную работу.
                    </p>
                    <Link href="/vacancy"><button>К Вакансиям</button></Link>
                </div>
                <div className="about-blok__section-2">
                    <img src="/images/header-1.png" alt="About IshCord" />
                </div>
            </div>
        </div>
    )
};