'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function Employer() {
    const params = useParams();
    const id = params?.id;
    const [employer, setEmployer] = useState(null);
    const [vacancies, setVacancies] = useState([]);
    const [activeTab, setActiveTab] = useState('company');

    useEffect(() => {
        if (!id) return;

        const fetchEmployerData = async () => {
            try {
                const response = await axios.get(`https://api.hh.ru/employers/${id}`);
                setEmployer(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных работодателя:', error);
            }
        };

        const fetchVacancies = async () => {
            try {
                const response = await axios.get(`https://api.hh.ru/vacancies?employer_id=${id}`);
                setVacancies(response.data.items);
            } catch (error) {
                console.error('Ошибка при загрузке вакансий:', error);
            }
        };

        fetchEmployerData();
        fetchVacancies();
    }, [id]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Добавляем проверку на наличие данных employer перед рендером
    if (!employer) {
        return <div className='loading'><div className='loading-spinner'></div></div>;
    }

    return (
        <div className='companyprofile'>
            <div className="companyprofile-blok">
                <div className="companyprofile-blok__section-1">
                    <div className="companyprofile-blok__section-1__part">
                        <p className='companyprofile-blok__section-1__part__b'>Город</p>
                        <p className='companyprofile-blok__section-1__part__p'>{employer.area?.name || 'Не указано'}</p>
                    </div>
                    <div className="companyprofile-blok__section-1__part">
                        <p className='companyprofile-blok__section-1__part__b'>Вакансии</p>
                        <p className='companyprofile-blok__section-1__part__p' style={{ color: 'var(--blue-light-color)' }}>
                            {vacancies.length} вакансий
                        </p>
                    </div>
                    <div className="companyprofile-blok__section-1__part">
                        <p className='companyprofile-blok__section-1__part__b'>Сфера деятельности</p>
                        <p className='companyprofile-blok__section-1__part__p companyprofile-blok__section-1__part__p-1'>
                            {employer.industries?.name || 'Не указано'}
                        </p>
                    </div>
                    <div className="companyprofile-blok__section-1__part">
                        <p className='companyprofile-blok__section-1__part__b'>Посмотреть в hh</p>
                        <p className='companyprofile-blok__section-1__part__p'>
                            <a href={`https://bukhara.hh.uz/employer/${employer.id}`}>Переход</a>
                        </p>
                    </div>
                </div>
                <div className="companyprofile-blok__section-2">
                    <div className="companyprofile-blok__section-2__part-1">
                        <img
                            src={employer.logo_urls?.original || '/images/user.webp'}
                            alt={employer.name}
                        />
                        <h1>{employer.name}</h1>
                    </div>
                    <div className="companyprofile-blok__section-2__part-2">
                        <button
                            className={`companyprofile-blok__section-2__part-2__button ${activeTab === 'company' ? 'active' : ''}`}
                            onClick={() => handleTabChange('company')}
                        >
                            О Компании
                        </button>
                        <button
                            className={`companyprofile-blok__section-2__part-2__button ${activeTab === 'vacancies' ? 'active' : ''}`}
                            onClick={() => handleTabChange('vacancies')}
                        >
                            Вакансии
                        </button>
                    </div>
                    <div className="companyprofile-blok__section-2__part-3">
                        {activeTab === 'company' ? (
                            <p dangerouslySetInnerHTML={{ __html: employer.description || 'Информация о компании не указана' }} />
                        ) : (
                            <ul>
                                {vacancies.map((vacancy) => (
                                    <li key={vacancy.id}>
                                        <a href={`/vacancy/${vacancy.id}`}>
                                            <h4>{vacancy.name}</h4>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};