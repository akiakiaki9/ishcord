'use client';
import { useAuth } from '@/AuthContext';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export default function CreateVacancy() {
    const [title, setTitle] = useState('');
    const [salaryFrom, setSalaryFrom] = useState('');
    const [salaryTo, setSalaryTo] = useState('');
    const [ageFrom, setAgeFrom] = useState('');
    const [ageTo, setAgeTo] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState([]);
    const [genders, setGenders] = useState([]);
    const [gender, setGender] = useState([]);
    const [formats, setFormats] = useState([]);
    const [format, setFormat] = useState([]);
    const [workSchedules, setWorkSchedules] = useState([]);
    const [workSchedule, setWorkSchedule] = useState([]);
    const [description, setDescription] = useState('');
    const { checkAccessToken, accessToken } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategoriesAndCities = async () => {
            try {
                const [categoriesRes, citiesRes, gendersRes, formatsRes, scheduleRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/categories/'),
                    axios.get('http://127.0.0.1:8000/api/cities/'),
                    axios.get('http://127.0.0.1:8000/api/genders/'),
                    axios.get('http://127.0.0.1:8000/api/formats/'),
                    axios.get('http://127.0.0.1:8000/api/schedule/')
                ]);

                setCategories(categoriesRes.data);
                setCities(citiesRes.data);
                setGenders(gendersRes.data);
                setFormats(formatsRes.data);
                setWorkSchedules(scheduleRes.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных для фильтрации:', error);
            }
        };

        fetchCategoriesAndCities();
    }, []);

    const handleCreateVacancy = async () => {
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            // router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/vacancy/create/', {
                title: title,
                category: category,
                city: city,
                salary_from: salaryFrom,
                salary_to: salaryTo,
                age_from: ageFrom,
                age_to: ageTo,
                time_from: timeFrom,
                time_to: timeTo,
                gender: gender,
                format: format,
                schedule: workSchedule,
                description: description
            }, {
                headers: { Authorization: `Bearer: ${accessToken}` }
            });
            setTitle('');
            setCategory('');
            setCity('');
            setSalaryFrom('');
            setSalaryTo('');
            setFormat('');
            setWorkSchedule('');
            setAgeFrom('');
            setAgeTo('');
            setTimeFrom('');
            setTimeTo('');
            setGender('');
            setDescription('');
            // setIsModalOpen(false);
        } catch (error) {
            console.error('Ошибка при создании вакансии:', error);
        }
    };

    return (
        <div>
            <div className="create__owner" onClick={() => setIsModalOpen(true)}>
                <p>Создать вакансию</p>
                <FaUserPlus className='create-blok__section-2__icon' />
            </div>
            {isModalOpen && (
                <div className='create'>
                    <div className='create-modal'>
                        <div className='create-blok__header'>
                            <h3>Создайте вакансию</h3>
                            <IoClose className='create-blok__header__icon' onClick={() => setIsModalOpen(false)} />
                        </div>
                        <div className="create-blok">
                            <div className="create-blok__section">
                                <div>
                                    <label>Название</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        placeholder="Назовите вакансию"
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="create-blok__section">
                                <div>
                                    <label>Категория</label>
                                    <select
                                        name="category"
                                        value={category}
                                        required
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Выберите категорию</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Город</label>
                                    <select
                                        name="city"
                                        value={city}
                                        required
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <option value="">Выберите город</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="create-blok__section">
                                <div>
                                    <label>Зарплата (от)</label>
                                    <input
                                        type="number"
                                        name="salaryFrom"
                                        value={salaryFrom}
                                        placeholder="От"
                                        required
                                        onChange={(e) => setSalaryFrom(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        name="salaryTo"
                                        value={salaryTo}
                                        placeholder="До"
                                        required
                                        onChange={(e) => setSalaryTo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="create-blok__section">
                                <div>
                                    <label>Возраст (от)</label>
                                    <input
                                        type="number"
                                        name="ageFrom"
                                        value={ageFrom}
                                        placeholder="От"
                                        required
                                        onChange={(e) => setAgeFrom(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        name="ageTo"
                                        value={ageTo}
                                        placeholder="До"
                                        required
                                        onChange={(e) => setAgeTo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="create-blok__section">
                                <div>
                                    <label>Время (с)</label>
                                    <input
                                        type="number"
                                        name="timeFrom"
                                        value={timeFrom}
                                        placeholder="С"
                                        required
                                        onChange={(e) => setTimeFrom(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        name="timeTo"
                                        value={timeTo}
                                        placeholder="До"
                                        required
                                        onChange={(e) => setTimeTo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="create-blok__section">
                                <div>
                                    <label>Пол</label>
                                    <select
                                        name="city"
                                        value={gender}
                                        required
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="">Выберите пол</option>
                                        {genders.map((gender) => (
                                            <option key={gender.id} value={gender.id}>
                                                {gender.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>График работы</label>
                                    <select
                                        name="schedule"
                                        value={workSchedule}
                                        required
                                        onChange={(e) => setWorkSchedule(e.target.value)}
                                    >
                                        <option value="">Выберите график</option>
                                        {workSchedules.map((schedule) => (
                                            <option key={schedule.id} value={schedule.id}>
                                                {schedule.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="create-blok__section">
                                <div>
                                    <label>Формат работы</label>
                                    <select
                                        name="format"
                                        value={format}
                                        required
                                        onChange={(e) => setFormat(e.target.value)}
                                    >
                                        <option value="">Выберите формат</option>
                                        {formats.map((format) => (
                                            <option key={format.id} value={format.id}>
                                                {format.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="create-blok__section">
                                <div>
                                    <label htmlFor="description">Описание вакансии</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={description}
                                        required
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder='Опишите вакансию подробно'
                                    />
                                </div>
                            </div>
                            <div className="create-blok__footer">
                                <button className='create-blok__footer__button1' onClick={handleCreateVacancy}>Опубликовать</button>
                                <button className='create-blok__footer__button2' onClick={() => setIsModalOpen(false)}>Отмена</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};