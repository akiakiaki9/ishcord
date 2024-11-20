'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { FaRegHeart } from "react-icons/fa";
import { isAuthorized } from '@/app/auth/cookies'; // Импорт функции для проверки авторизации
import Link from 'next/link';

export default function LayOutComp({ data }) {
    const [filters, setFilters] = useState({
        city: '',
        salary: '',
        category: '',
    });
    const [favorites, setFavorites] = useState([]);
    const [modalData, setModalData] = useState(null); // Для управления модальным окном
    const [coverLetter, setCoverLetter] = useState(''); // Текст сопроводительного письма

    const handleClick = () => {
        if (isAuthorized()) {
            return;
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleFavoriteClick = async (vacancy) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/favorites', {
                id: vacancy.id,
                title: vacancy.title,
                city: vacancy.city,
                salary: vacancy.salary,
                category: vacancy.category,
            });
            if (response.status === 200) {
                setFavorites((prev) => [...prev, vacancy.id]);
            }
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
        }
    };

    const handleApplyClick = (vacancy) => {
        setModalData(vacancy); // Открытие модального окна
    };

    const handleSendApplication = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/applications', {
                vacancyId: modalData.id,
                coverLetter,
            });
            if (response.status === 200) {
                alert('Ваш отклик отправлен!');
                setModalData(null); // Закрытие модального окна
                setCoverLetter(''); // Очистка поля ввода
            }
        } catch (error) {
            console.error('Ошибка при отправке отклика:', error);
        }
    };

    const filteredData = Array.isArray(data)
        ? data.filter((vacancy) => {
            const matchesCity = filters.city ? vacancy.city === filters.city : true;
            const matchesSalary = filters.salary ? vacancy.salary >= Number(filters.salary) : true;
            const matchesCategory = filters.category ? vacancy.category === filters.category : true;
            return matchesCity && matchesSalary && matchesCategory;
        })
        : [];

    if (!data) {
        return <div className='layout'><p>Загрузка данных...</p></div>;
    }

    return (
        <div className='layout'>
            <div className="layout-filters">
                <label>
                    Город:
                    <select name="city" value={filters.city} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        <option value="Бухара">Бухара</option>
                        <option value="Ташкент">Ташкент</option>
                        <option value="Самарканд">Самарканд</option>
                    </select>
                </label>

                <label>
                    Минимальная зарплата:
                    <input
                        type="number"
                        name="salary"
                        value={filters.salary}
                        onChange={handleFilterChange}
                        placeholder="Введите сумму"
                    />
                </label>

                <label>
                    Категория:
                    <select name="category" value={filters.category} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        <option value="IT">IT</option>
                        <option value="Маркетинг">Маркетинг</option>
                        <option value="Образование">Образование</option>
                    </select>
                </label>
            </div>

            <div className="layout-blok">
                {filteredData.length > 0 ? (
                    filteredData.map((vacancy) => (
                        <div key={vacancy.id} className="vacancy-card">
                            <h3>{vacancy.title}</h3>
                            <p>Город: {vacancy.city}</p>
                            <p>Зарплата: {vacancy.salary} UZS</p>
                            <p>Категория: {vacancy.category}</p>
                            <button
                                onClick={() => handleFavoriteClick(vacancy)}
                                style={{
                                    backgroundColor: favorites.includes(vacancy.id) ? 'red' : 'gray',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    padding: '10px',
                                }}
                            >
                                <FaRegHeart />
                            </button>
                            {isAuthorized() ? (
                                <button onClick={() => handleApplyClick(vacancy)}>Откликнуться</button>
                            ) : (
                                <Link href="/log-in">
                                    <button>Войти</button>
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Нет вакансий, соответствующих выбранным фильтрам.</p>
                )}
            </div>

            {/* Модальное окно */}
            {modalData && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Отклик на вакансию: {modalData.title}</h3>
                        <textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Введите сопроводительное письмо"
                            rows="5"
                            style={{ width: '100%' }}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSendApplication}>Отправить</button>
                            <button onClick={() => setModalData(null)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};