"use client"
import React from 'react'

export default function Version() {
    return (
        <div className='required'>
            <div className="required-blok">
                <h1>Информация о версиях IshCord</h1>
                <div className="required-blok__section">
                    <h2>IshCord на продакшене v0.1 (23.04.2025)</h2>
                    <ul>
                        <li>- Приложение впервые на продакшене и готово к использованию</li>
                        <li>- Основной функционал фильтрации вакансий реализован</li>
                        <li>- Поддержка адаптивной верстки для мобильных устройств</li>
                        <li>- Поиск и сортировка вакансий работают стабильно</li>
                        <li>- Интерфейс протестирован вручную на популярных браузерах</li>
                        <li>- Данные фильтров сохраняются в локальном хранилище браузера</li>
                    </ul>
                </div>
                <div className="required-blok__section">
                    <h2>IshCord — выпуск v0.2 (30.04.2025)</h2>
                    <ul>
                        <li>- Исправлены визуальные баги и улучшена стабильность интерфейса</li>
                        <li>- Добавлены категории вакансий для удобного поиска (доступно на ПК и ноутбуках)</li>
                        <li>- Расширены фильтры: теперь можно искать по опыту работы и времени публикации</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};