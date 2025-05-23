'use client';
import React, { useState, useEffect } from 'react';
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import axios from 'axios';
import { FaSearch, FaInfoCircle } from "react-icons/fa";
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";

export default function Termez() {
    const [vacancies, setVacancies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortNewFirst, setSortNewFirst] = useState(false);
    const [noExperience, setNoExperience] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [showScheduleList, setShowScheduleList] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSelectedCategory(localStorage.getItem('selectedCategory') || '');
            setSortNewFirst(localStorage.getItem('sortNewFirst') === 'true');
            setSelectedSchedule(localStorage.getItem('selectedSchedule') || '');
            setNoExperience(localStorage.getItem('noExperience') === 'true');
            setPage(parseInt(localStorage.getItem('currentPage')) || 1);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('noExperience', noExperience);
    }, [noExperience]);

    useEffect(() => {
        localStorage.setItem('selectedSchedule', selectedSchedule);
    }, [selectedSchedule]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await axios.get('https://api.hh.ru/dictionaries');
                setSchedules(res.data.schedule || []);
            } catch (err) {
                console.error('Ошибка при загрузке форматов работы:', err);
            }
        };

        fetchSchedules();
    }, []);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const areaId = '2789';

                const params = {
                    page: page - 1,
                    per_page: 20,
                    area: areaId,
                    order_by: sortNewFirst ? 'publication_time' : undefined,
                };

                if (selectedCategory) params.professional_role = selectedCategory;
                if (selectedSchedule) params.schedule = selectedSchedule;
                if (searchTerm) params.text = searchTerm;
                if (noExperience) params.experience = 'noExperience';

                const { data } = await axios.get('https://api.hh.ru/vacancies', { params });

                setVacancies(data.items || []);
                setTotalPages(Math.ceil((data.found || 0) / 10));
            } catch (error) {
                console.error('Ошибка при загрузке вакансий.');
            }
        };

        fetchVacancies();
    }, [
        page,
        selectedCategory,
        searchTerm,
        sortNewFirst,
        noExperience,
        selectedSchedule,
    ]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        localStorage.setItem('currentPage', newPage);
    };

    const handleSortNewFirst = () => {
        const newState = !sortNewFirst;
        setSortNewFirst(newState);
        localStorage.setItem('sortNewFirst', newState);
    };

    const currencySymbols = { RUR: '₽', RUB: '₽', USD: '$', EUR: '€', UZS: 'сум', };

    return (
        <div className="layout">
            <div className="vacancies">
                <div className="vacancies-blok">
                    <Link href='/vacancy'>Все вакансии</Link>
                    <p>/</p>
                    <h3>Термез</h3>
                </div>
            </div>
            <div className="vacancy">
                <div className="filters">
                    <div className="filters-blok">
                        <div className="filters-blok__section-1">
                            <input
                                type="search"
                                placeholder="Поиск по вакансиям"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="filters-blok__section-1__icon" />
                        </div>
                        <div className="filters-blok__section-2">
                            <div className='filters-blok__section-2__part-2'>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Формат работы"
                                        value={
                                            selectedSchedule
                                                ? schedules.find(s => s.id === selectedSchedule)?.name || ''
                                                : ''
                                        }
                                        readOnly
                                        onClick={() => setShowScheduleList(!showScheduleList)}
                                    />
                                    <IoIosArrowDown className='filters-blok__section-2__icon' />
                                    {showScheduleList && (
                                        <ul className="city-dropdown">
                                            <li onClick={() => {
                                                setSelectedSchedule('');
                                                setShowScheduleList(false);
                                            }}>
                                                Все форматы
                                            </li>
                                            {schedules.map(schedule => (
                                                <li
                                                    key={schedule.id}
                                                    onClick={() => {
                                                        setSelectedSchedule(schedule.id);
                                                        setShowScheduleList(false);
                                                    }}
                                                >
                                                    {schedule.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button onClick={() => setNoExperience(prev => !prev)}
                                    className={`filters-blok__section-2__part-2__button ${noExperience ? 'active' : ''}`}
                                >
                                    Без опыта
                                </button>
                            </div>
                            <div className='filters-blok__section-2__part-2'>
                                <button onClick={handleSortNewFirst} className={`filters-blok__section-2__part-2__button ${sortNewFirst ? 'active' : ''}`}>
                                    Сначала новые
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {vacancies.length === 0 ? (
                <p className='no-info'>Нет вакансий</p>
            ) : (
                <div className="vacancy__cards">
                    {vacancies.map((vacancy) => (
                        <div key={vacancy.id} className="vacancy__card">
                            <div className="vacancy__card__header">
                                <Link href={`/vacancy/${vacancy.id}`}>
                                    <h3>{vacancy.name}</h3>
                                </Link>
                            </div>
                            <div className="vacancy__card__section-1">
                                <p>Зарплата: {vacancy.salary
                                    ? vacancy.salary.from && vacancy.salary.to
                                        ? `${vacancy.salary.from.toLocaleString()} - ${vacancy.salary.to.toLocaleString()} ${currencySymbols[vacancy.salary.currency] || vacancy.salary.currency}`
                                        : vacancy.salary.from
                                            ? `${vacancy.salary.from.toLocaleString()} ${currencySymbols[vacancy.salary.currency] || vacancy.salary.currency}`
                                            : vacancy.salary.to
                                                ? `${vacancy.salary.to.toLocaleString()} ${currencySymbols[vacancy.salary.currency] || vacancy.salary.currency}`
                                                : 'Не указано'
                                    : 'Не указано'}
                                </p>
                            </div>
                            <div className="vacancy__card__section-2">
                                <div className="vacancy__card__section-2__part">
                                    <Link href={`/employer/${vacancy.employer.id}`} rel="noopener noreferrer">
                                        {vacancy.employer.name}
                                    </Link>
                                    <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                </div>
                                <div className="vacancy__card__section-2__part"><p>{vacancy.area.name}</p></div>
                            </div>
                            <div className="vacancy__card__footer">
                                <a href={vacancy.alternate_url} target="_blank" rel="noopener noreferrer">
                                    <button className="vacancy__button">Отклик в hh</button>
                                </a>
                                <Link href={`vacancy/${vacancy.id}`}><FaInfoCircle className='vacancy__card__footer__icon' /></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination">
                <button onClick={() => handlePageChange(Math.max(page - 1, 1))} disabled={page === 1}>Назад</button>
                <button onClick={() => handlePageChange(1)} className={page === 1 ? 'active' : ''}>1</button>
                {page > 3 && <span>...</span>}
                {Array.from({ length: 5 }, (_, i) => {
                    const pageNumber = page - 2 + i;
                    if (pageNumber > 1 && pageNumber < totalPages) {
                        return (
                            <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={page === pageNumber ? 'active' : ''}>
                                {pageNumber}
                            </button>
                        );
                    }
                    return null;
                })}
                {page < totalPages - 2 && <span>...</span>}
                {totalPages > 1 && (
                    <button onClick={() => handlePageChange(totalPages)} className={page === totalPages ? 'active' : ''}>
                        {totalPages}
                    </button>
                )}
                <button onClick={() => handlePageChange(Math.min(page + 1, totalPages))} disabled={page === totalPages}>След</button>
            </div>
        </div>
    );
};