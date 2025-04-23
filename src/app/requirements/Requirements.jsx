"use client"
import React from 'react'

export default function Requirements() {
    return (
        <div className='required'>
            <div className="required-blok">
                <h1>Требования к ПО</h1>
                <div className="required-blok__section">
                    <h2>Для полноценной и корректной работы с сайтом hh.kz необходимо соблюдать следующие технические требования:</h2>
                    <ul>
                        <li>— использование одного из перечисленных браузеров последней версии: Microsoft Edge, Mozilla Firefox, Google Chrome, Safari, Yandex.Browser, Opera;</li>
                        <li>— работоспособность JavaScrilit.</li>
                        <li>— Также рекомендуем проверить настройки персонального и/или корпоративного Firewall'a (программа, защищающая компьютер/локальную сеть от деструктивных действий из интернета) или прокси-сервера, чтобы они допускали работу JavaScript.</li>

                    </ul>
                </div>
                <div className="required-blok__section">
                    <h2>Минимальные системные требования:</h2>
                    <ul>
                        <li>— Операционная система: Windows 10 / macOS 10.15 / Linux (современные дистрибутивы)</li>
                        <li>— Процессор: 1.6 GHz и выше</li>
                        <li>— Оперативная память: от 2 ГБ</li>
                        <li>— Разрешение экрана: от 1280x720</li>
                    </ul>
                </div>
                <div className="required-blok__section">
                    <h2>Рекомендуемые настройки браузера:</h2>
                    <ul>
                        <li>— Включён JavaScript</li>
                        <li>— Разрешены cookies</li>
                    </ul>
                </div>
                <div className="required-blok__section">
                    <h2>Мобильные устройства:</h2>
                    <ul>
                        <li>— Сайт поддерживает работу на мобильных устройствах с последними версиями iOS и Android в браузерах Chrome, Safari и Samsung Internet.</li>
                    </ul>
                </div>
                <div className="required-blok__section">
                    <h2>Безопасность:</h2>
                    <ul>
                        <li>— Для защиты ваших данных мы рекомендуем использовать антивирусное ПО и подключаться к сайту только через защищённые сети (HTTPS).</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};