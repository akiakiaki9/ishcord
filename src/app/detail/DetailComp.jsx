'use client'
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Link from 'next/link';

export default function DetailComp() {
    return (
        <div className='layout'>
            <div className='vacancy-detail'>
                <div className="vacancy-detail-blok">
                    <div className="vacancy-detail-blok__section-1">
                        <div className="vacancy-detail-blok__section-1__card">
                            <div className="vacancy-detail-blok__section-1__card__header">
                                <p>Опубликовано Сегодня в <span className='number-style'>15:01</span></p>
                                <h1>Собиратель голосов общественного мнения</h1>
                            </div>
                            <div className="vacancy-detail-blok__section-1__card__section-1">
                                <p className='vacancy-detail-blok__section-1__card__section-1-p1'>от 3 000 000 до 5 000 000 UZS</p>
                                <p className='vacancy-detail-blok__section-1__card__section-1-p2'>Ташкент</p>
                                <p className='vacancy-detail-blok__section-1__card__section-1-p3'>Ташкент, Мирзо-Улугбекский район</p>
                            </div>
                            <div className="vacancy-detail-blok__section-1__card__section-2">
                                <p>Требуемый опыт работы: <span>не требуется</span></p>
                                <p>Формат работы: <span>удаленная работа</span></p>
                                <p>
                                    Работа с <span className='number-style'>9:00</span> до <span className='number-style'>18:00</span>,
                                    график работы <span className='number-style'>6/1</span>
                                </p>
                            </div>
                            <div className="vacancy-detail-blok__section-1__card__footer">
                                <button className='vacancy__button'>Откликнуться</button>
                                <MdFavoriteBorder className='vacancy-detail-blok__section-1__card__footer__icon' />
                            </div>
                        </div>
                        <div className="vacancy-detail-blok__section-1__description">
                            <h3>Подробно:</h3>
                            <br />
                            <p className='vacancy-detail-blok__section-1__description-p1'>Требуется  Project Manager (заместитель) <br />
                                В кампанию SWITZERLAND GROUP<br />
                                Наша компания занимается приборостроения аппаратными решениями и IT<br />
                                www.swgroup.uz<br />
                                90*****98  тел<br />
                                Обязанности:<br />
                                - Организация и управление проектами на всех этапах, от планирования до завершения.<br />
                                - Проведение переговоров с заказчиками, уточнение требований и постановка задач для команды.<br />
                                - Перевод бизнес-требований клиента на технический язык, понятный разработчикам.<br />
                                - Разделение проекта на этапы и распределение задач между членами команды для ускорения процесса выполнения.<br />
                                - Контроль сроков выполнения задач и обеспечение соблюдения дедлайнов.<br />
                            </p>
                            <p className='vacancy-detail-blok__section-1__description-p2'><span>Контактное лицо:</span> Нода Александр</p>
                        </div>
                    </div>
                    <div className="vacancy-detail-blok__section-2">
                        <div className="vacancy-detail-blok__section-2__card">
                            <Link href="/">
                                <img src="/images/user.webp" alt="IshCord User Image" />
                                <div className="vacancy-detail-blok__section-2__card__container">
                                    <h3>ООО СВОИ Компания по производству</h3>
                                    <IoShieldCheckmarkOutline className='vacancy-detail-blok__section-2__card__icon' />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};